var Client = require('node-rest-client').Client;
var client = new Client ();

function resetAccount (account) {
  console.log ("Resetting account " + account);
  var url = "http://microbank-" + account + "/reset";
  console.log ("URL: " + url);
  client.get(url, function (data, response) {
    console.log ("Account " + account + " reset");
  });


}

function resetAccounts (attempts) {
  console.log ("Getting all accounts");
  var url = "http://microbank-account-system/accounts";
  var req = client.get(url, function (data, response) {
    console.log ("Data:");
    console.log (data); 
    accounts = data.accounts;
    for (var i = 0; i < accounts.length; i++) {
      resetAccount(accounts[i]);
    }
  });

  req.on('error', function (err) {
     console.log('request error', err);
     console.log("Trying again...");
     if (attemps > 0) {
       resetAccounts(attempts-1);
     }
  }); 
}
   
resetAccounts(10);  
