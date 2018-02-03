var os = require('os');

var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";

var client = require('./rest_client/restClientHelper');

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

  console.log ("args: ");
  console.log (args);

  client.post(url, args, function (data, response) {
  });

}

function lockAccount(account) {
  var base_url = "http://microbank-account/lock/";

  console.log ("Locking account " + account);

  var url = base_url + account;

  client.get (url, function (data, response) {
    console.log ("Status " + response.statusCode);

    if (response.statusCode == 400) {
      console.log ("Trying again...");
      setTimeout (lockAccount, 1e3, account);
    }
  })
}

function listenToUpdateQueue () {
    console.log ("==> Listening to the update queue..."); 
    queue.consumeMessage(UPDATE_QUEUE, function (message) {
        account = message.toString();
        console.log ("==> Message: " + message);
        obj = JSON.parse(message);
        lockAccount (obj.account);
        updateBalance (obj.account, obj.amount);
    }); 
}

listenToUpdateQueue();

module.exports = {
}