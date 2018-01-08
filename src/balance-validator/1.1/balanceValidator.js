var Client = require('node-rest-client').Client;
var client = new Client ();

var INITIAL_BALANCE=100;
var NUMBER_OF_ACCOUNTS = 2;

var sum;
var counter;
var expected;

function parseBalance(res, data) {
  balance = data.balance;

  console.log ("Balance: " + balance);
  sum = sum + balance;
}

function checkSum(res){
  res.setHeader('Content-Type', 'text/plain');
  if (sum == expected) {
    res.send ("Sum and expected balances match: " + sum);
  } else {
    res.send ("PROBLEM!!! Sum: " + sum + " expected: " + expected);
  }
}

function obtainBalance(res, account) {
  var base_url = "http://microbank-balance.microbank.svc.cluster.local/balance/";

  console.log ("Obtaining balance for account " + account);
  url = base_url + account;
  console.log ("URL: " + url);

  var req = client.get(url, function(data, response) {
    parseBalance (res, data);
    counter--;
    if (counter == 0) {
      checkSum (res);
    }
  });

  req.on('error', function (err) {
    console.log('=== obtainBalance request error', err);
  });
}

function obtainBalances(res, data) {
  var accounts = data.accounts;
  console.log ("Obtainining balance... Number of accounts: " + accounts.length);

  if (accounts.length == 0) {
        res.send ("PROBLEM!!! No account found");
  } else {
    counter = accounts.length;
    sum = 0;
    expected = counter*INITIAL_BALANCE;
    for (var i = 0; i < accounts.length; i++) {
      obtainBalance(res, accounts[i]);
    }
  }
}

function checkAccountNumber(res, data) {
  var accounts = data.accounts;
  console.log ("Obtainining balance... Number of accounts: " + accounts.length);

  if (accounts.length != NUMBER_OF_ACCOUNTS) {
        res.send ("PROBLEM!!! Found " + accounts.length + ", expected " + NUMBER_OF_ACCOUNTS);
  }  
}

function getAccounts (res) {
  var url = "http://microbank-account-system.microbank.svc.cluster.local/accounts";
  client.get(url, function (data, response) {
    console.log ("data:" + data);
    checkAccountNumber(res, data);
    obtainBalances (res, data);
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