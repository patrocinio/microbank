var client = require('./rest_client/restClientHelper');

function resetAccounts () {
  console.log ("Getting all accounts");
  var url = "http://microbank-account-system/reset";
  var req = client.get(url, function (data, response) {
  });
}

function resetQueue () {
  console.log ("Resetting queue");
  var url = "http://microbank-queue-mgr/reset";
  var req = client.get(url, function (data, response) {
  });

}

function resetTransferCounter () {
  console.log ("Resetting transfer counter");
  var url = "http://microbank-transfer/reset";
  var req = client.get(url, function (data, response) {
  });

}
   
resetAccounts();  
resetQueue ();
resetTransferCounter();