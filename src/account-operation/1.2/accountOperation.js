var os = require('os');

var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";

var client = require('./rest_client/restClientHelper');

var logger = require('./logger/logger');

function displayData (data) {
  console.log ("Data:");
  console.log (data);
  if (data.type == "Buffer") {
    console.log ("Found a buffer!");
    buf = Buffer.from(data.data);
    console.log (buf.toString());
  }

  if (Buffer.isBuffer (data)) {
    console.log ("Found a buffer!!");
    console.log (data.toString());
  }
}


function updateBalance(account, delta) {
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
     } else {
      console.log ("PROBLEM!!");
      console.log ("Response:");
      console.log (response);
      console.log ("Data:");
      console.log (data);
      displayData (data);
     }
  });

}

function lockAccount(message, attempts) {
  var base_url = "http://microbank-account/lock/";

  obj = JSON.parse(message);
  console.log ("Locking account " + obj.account + " attempt #" + attempts);
  logger.logMessage ("Locking account  " + obj.account + " attempt #" + attempts);


  var url = base_url + obj.account;

  client.get (url, function (data, response) {
    console.log ("Status " + response.statusCode);

    if (response.statusCode == 200) {
      updateBalance(obj.account, obj.amount);
    } else {
      console.log ("Trying again...");
      setTimeout (lockAccount, 1e3, message, attempts+1);
    }
  })
}

function listenToUpdateQueue () {
    console.log ("==> Listening to the update queue..."); 
    queue.consumeMessage(UPDATE_QUEUE, function (message) {
        account = message.toString();
        console.log ("==> Message: " + message);
        lockAccount (message, 0);
    }); 
}

listenToUpdateQueue();

module.exports = {
}