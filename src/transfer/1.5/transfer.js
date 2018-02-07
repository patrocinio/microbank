var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";

var logger = require('./logger/logger');

var redisHelper = require('./redis/redisHelper');
var REDIS_URL = "redis://microbank-transfer-redis";
var TRANSACTION_KEY = "transaction_id";

function updateAccount(res, account, amount) {
  message = { account : account, amount: amount };

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

function doTransfer (req, res, transactionId) {

  var from = req.body.from;
  var to = req.body.to;
  var amount = req.body.amount;

  console.log ("===> Transfering from account " + from + " to " + to + 
    " amount " + amount + " transaction_id " + transactionId);
  logger.logMessage ("Transfering from account " + from + " to " + to + 
    " amount " + amount +  " transaction_id " + transactionId);

  var withdrawal = -amount;
  updateAccount (res, from, withdrawal.toString());
  updateAccount (res, to, amount.toString());
  res.send("Done!");
}

function transfer (req, res) {
  getTransactionId (req, res, doTransfer);
}


module.exports = {
    transfer: transfer
}