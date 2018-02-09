var client = require('./rest_client/restClientHelper');

var logger = require('./logger/logger');

var INITIAL_BALANCE=100;
var NUMBER_OF_ACCOUNTS = 2;

var sum;
var counter;
var expected;

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

function parseBalance(res, data) {
  displayData(data);
  balance = data.balance;

  console.log ("Balance: " + balance);
  sum = sum + balance;
  return balance;
}

function checkSum(res){
  res.setHeader('Content-Type', 'text/plain');
  if (sum == expected) { 
    logger.logMessage ("Sum and expected balances match: " + sum);
    res.send ("Sum and expected balances match: " + sum);
  } else {
    logger.logMessage("PROBLEM!!! Sum: " + sum + " expected: " + expected);
    res.status(400).send ("PROBLEM!!! Sum: " + sum + " expected: " + expected);
  }
}

function returnSum(res){
    result = { "balance" : sum };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));  
}

function obtainBalance(res, account, callback) {
  var base_url = "http://microbank-account.microbank.svc.cluster.local/balance/";

  console.log ("Obtaining balance for account " + account);
  url = base_url + account;
  console.log ("URL: " + url);

  var req = client.get(url, function(data, response) {
      console.log ("Account: " + account);
      balance = parseBalance (res, data);
//      logger.logMessage ("Account " + account + " balance " + balance);
      console.log ("Account " + account + " balance " + balance);
      counter--;
      if (counter == 0) {
        callback (res);
      } else {
        console.log ("Waiting for another " + counter + " results");
      } 
  });

}

function obtainBalances(res, data, callback) {
  var accounts = data.accounts;
  console.log ("Obtainining balance... Number of accounts: " + accounts.length);
//  logger.logMessage ("Obtainining balance... Number of accounts: " + accounts.length);

  if (accounts.length == 0) {
    res.send ("No account found");
  } else {
    counter = accounts.length;
    sum = 0;
    expected = counter*INITIAL_BALANCE;
    for (var i = 0; i < accounts.length; i++) {
      obtainBalance(res, accounts[i], callback);
    }
  }
}

function getAccounts (res, callback) {
  console.log ("Getting accounts");
  var url = "http://microbank-account-system.microbank.svc.cluster.local/accounts";
  var req = client.get(url, function (data, response) {
    console.log ("Account response status: " + response.statusCode);
    displayData (data);
    obtainBalances (res, data, callback); 
  });

}

function checkQueue (res, callback) {
  console.log ("Checking queue");
  var url = "http://microbank-queue-mgr.microbank.svc.cluster.local/check";
  var req = client.get(url, function (data, response) {
    console.log ("Queue response status: " + response.statusCode);
    if (response.statusCode == 200) {
      getAccounts (res, callback);
    } else {
      console.log ("Trying again...");
      setTimeout(checkQueue, 1e3, res, callback);
    }
  });
}

function validateBalance (req, res) {
  checkQueue (res, checkSum);
}

function getBalance (req, res) {
  checkQueue (res, returnSum);
}


module.exports = {
    validate: validateBalance,
    getBalance: getBalance
}