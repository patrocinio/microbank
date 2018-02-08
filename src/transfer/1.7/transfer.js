var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";
const UPDATE_ACK_QUEUE = "update_ack";

var logger = require('./logger/logger');

var redisHelper = require('./redis/redisHelper');
var REDIS_URL = "redis://microbank-transfer-redis";
var TRANSACTION_KEY = "transaction_id";
var TRANSACTION_COUNT = "transaction_count";

function updateAccount(res, account, amount, transactionId) {
  var message = { 
    transactionId: transactionId,
    account: account, 
    amount: amount
  };

  console.log ("Sending " + amount + " to " + account); 
  logger.logMessage ("Sending " + amount + " to " + account); 

  queue.sendMessage (UPDATE_QUEUE, JSON.stringify(message)); 
}

function getTransactionId (req, res, callback) {
  console.log ("Getting transaction ID");
    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (TRANSACTION_KEY, function (err, reply) {
        var id;
        if (reply == null) {
            console.log ("==> transaction_id not found");
            id = 0;
        } else {

            console.log ("Found transaction_id: " + reply.toString());
            id = parseInt(reply.toString());
            id++;
        }
        client.set (TRANSACTION_KEY, id);
        client.quit();

        console.log ("Returning with id " + id);
        callback (req, res, id);
    }); 

}

function getTransactionCountCallback (callback) {
  console.log ("Getting transaction count");
    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (TRANSACTION_COUNT, function (err, reply) {
        var count;
        if (reply == null) {
            console.log ("==> transaction_count not found");
            count = 0;
        } else {

            console.log ("Found transaction_count: " + reply.toString());
            count = parseInt(reply.toString());
        }

        client.quit ();
        callback (count);
    }); 

}

function getTransactionCount (req, res) {
  getTransactionCountCallback (function (count) {
        result = { "transactionCount" : count };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));  
  })
}

function persistCount (count) {
  var client = redisHelper.connectToRedis(REDIS_URL);
  client.set (TRANSACTION_COUNT, count);
  client.quit();
}

function updateTransactionCount () {
  console.log ("Updating transaction count");
  getTransactionCountCallback (function (count) {
    count += 1;
    persistCount (count);
  }); 
}


// Persist 2 to indicate we're waiting for 2 acks
function createTransactionAckCounter (transactionId) {
    console.log ("Persisting AckCounter for transaction " + transactionId);
    logger.logMessage ("Persisting AckCounter for transaction " + transactionId);
    var client = redisHelper.connectToRedis(REDIS_URL); 
    client.set (transactionId, 2);
    client.quit ();
}

function doTransfer (req, res, transactionId) {

  var from = req.body.from;
  var to = req.body.to;
  var amount = req.body.amount;

  console.log ("===> Transfering from account " + from + " to " + to + 
    " amount " + amount + " transaction_id " + transactionId);
  logger.logMessage ("Transfering from account " + from + " to " + to + 
    " amount " + amount +  " transaction_id " + transactionId);

  createTransactionAckCounter(transactionId);

  var withdrawal = -amount;
  updateAccount (res, from, withdrawal.toString(), transactionId);
  updateAccount (res, to, amount.toString(), transactionId);
  res.send("Done!");
}

function transfer (req, res) {
  getTransactionId (req, res, doTransfer);
}

function commit () {
  console.log ("Committing transaction");
  updateTransactionCount ();
}

function deductAckCounter (transactionId) {
    console.log ("Deducting ackCounter for transaction " + transactionId);
    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (transactionId, function (err, reply) {
      var counter = reply-1;
      console.log ("Setting counter to " + counter);
      client.set (transactionId, counter);
      client.quit ();

      if (counter == 0) {
        commit();
      }
    }); 

}

function reconcileAck (message) {
  console.log ("content: " + message.content.toString());
  var obj = JSON.parse (message.content.toString ());
  console.log ("transactionId: " + obj.transactionId);
  deductAckCounter (obj.transactionId);
}

function listenToAckQueue () {
    console.log ("==> Listening to the ack queue..."); 
    queue.consumeMessage(UPDATE_ACK_QUEUE, function (channel, message) {
        account = message.toString();
        console.log ("==> Received message at ack queue");
        reconcileAck (message);
        queue.ack (channel, message);
    }); 
}

function reset (req, res) {
  console.log ("Resetting counter");
  persistCount (0);
  res.send ("Account reset");
}

listenToAckQueue();

module.exports = {
    transfer: transfer,
    getTransactionCount : getTransactionCount,
    reset: reset
}