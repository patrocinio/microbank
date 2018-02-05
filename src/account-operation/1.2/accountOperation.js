var os = require('os');

var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";

var client = require('./rest_client/restClientHelper');

var logger = require('./logger/logger');


function updateBalance(account, delta) {
  var url = "http://microbank-account/update/";

  console.log ("==> URL: " + url);

  args = {
    data: 
    { 
      account: account,
      amount: delta
    },
    headers: { "Content-Type": "application/json" }
  };

  logger.logMessage ("Updating account " + account + " with amount " + delta);

  client.post(url, args, function (data, response) {
  });

}

function lockAccount(account, attempts) {
  var base_url = "http://microbank-account/lock/";

  console.log ("Locking account " + account + " attempt #" + attempts);
  logger.logMessage ("Locking account  " + account + " attempt #" + attempts);


  var url = base_url + account;

  client.get (url, function (data, response) {
    console.log ("Status " + response.statusCode);

    if (response.statusCode == 400) {
      console.log ("Trying again...");
      setTimeout (lockAccount, 1e3, account, attempts+1);
    }
  })
}

function listenToUpdateQueue () {
    console.log ("==> Listening to the update queue..."); 
    queue.consumeMessage(UPDATE_QUEUE, function (message) {
        account = message.toString();
        console.log ("==> Message: " + message);
        obj = JSON.parse(message);
        lockAccount (obj.account, 0);
        updateBalance (obj.account, obj.amount);
    }); 
}

listenToUpdateQueue();

module.exports = {
}