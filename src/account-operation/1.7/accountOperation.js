var os = require('os');

var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";
const UPDATE_ACK_QUEUE = "update_ack";
const EXPIRE_QUEUE = "expire";

var client = require('./rest_client/restClientHelper');

var logger = require('./logger/logger'); 

function ackMessage (message) {
  console.log ("Ack'ing message");
  logger.logMessage ("Ack'ing message " + message);
  queue.sendMessage (UPDATE_ACK_QUEUE, message);
  queue.sendMessage (EXPIRE_QUEUE, message);
}

function updateBalance(channel, message, account, delta) {
  var url = "http://microbank-account/update";

  console.log ("==> URL: " + url);

  logger.logMessage ("Updating account " + account + " with amount " + delta);

  var args = {
    data: 
    { 
      account: account,
      amount: delta
    },
    headers: { "Content-Type": "application/json" }
  };

  client.post(url, args, function (data, response) {
     if (response.statusCode == 200) {
      console.log ("Succeeded");
      ackMessage (message.content);
      queue.ack (channel, message);
     } else {
      console.log ("PROBLEM!!");
      console.log ("Response:");
      console.log (response);
      console.log ("Data:");
      console.log (data);
     }
  });

}

function lockAccount(channel, message, attempts) {
  var base_url = "http://microbank-account/lock/";

  console.log ("==> Message content " + message.content);
  var obj = JSON.parse(message.content);
  console.log ("Locking account " + obj.account + " attempt #" + attempts);
  logger.logMessage ("Locking account  " + obj.account + " attempt #" + attempts);


  var url = base_url + obj.account;

  client.get (url, function (data, response) {
    console.log ("Status " + response.statusCode);

    if (response.statusCode == 200) {
      updateBalance(channel, message, obj.account, obj.amount);
    } else {
      console.log ("Trying again...");
      setTimeout (lockAccount, 1e3, channel, message, attempts+1);
    }
  })
}

function listenToUpdateQueue () {
    console.log ("==> Listening to the update queue..."); 
    queue.consumeMessage(UPDATE_QUEUE, function (channel, message) {
        account = message.toString();
        console.log ("==> Message: " + message);
        lockAccount (channel, message, 0);
    }); 
}

listenToUpdateQueue();

module.exports = {
}