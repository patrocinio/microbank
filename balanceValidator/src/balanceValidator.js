var Client = require('node-rest-client').Client;

var client = new Client ();

function obtainBalance(res, account) {
  var base_url = "http://balance-balance.svc.cluster.local/balance/";

  console.log ("Obtaining balance for account " + account);
  url = base_url + accounts[i];

  client.get(url, function(data, response) {
    console.log ("data: " + data);
  })
}

function obtainBalances(res, data) {
  var accounts = data.accounts;
  console.log ("Obtainining balance... Number of accounts: " + accounts.length);

  for (var i = 0; i < accounts.length; i++) {
    obtainBalance(res, accounts[i]);
  }
}

function getAccounts (res) {
  var url = "http://account-system-account-system.microbank.svc.cluster.local/accounts";
  client.get(url, function (data, response) {
    console.log ("data:" + data);
    obtainBalances (res, data);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
}

function validateBalance (res) {
  getAccounts(res);
}


module.exports = {
    get: function(req, res) {
        console.log ("Validating balance...")
        validateBalance(res)
        console.log ("Returning result")
    }
}