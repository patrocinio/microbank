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

function listenToUpdateQueue () {
    console.log ("==> Listening to the update queue..."); 
    queue.consumeMessage(UPDATE_QUEUE, function (message) {
        account = message.toString();
        console.log ("==> Message: " + message);
        obj = JSON.parse(message);
        updateBalance (obj.account, obj.amount);
    }); 
}

listenToUpdateQueue();

module.exports = {
}