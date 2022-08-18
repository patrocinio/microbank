var balance = 100;

var accounts = [];

var queue = require('./queue/queue');
const ACCOUNT_QUEUE = "accounts";

var mysql = require('./mysql/mysql')
var connection = mysql.connect();

function get (req, res) {
    console.log ("Retrieving accounts");
    console.log ("accounts: " + accounts);
    result = { "accounts" : accounts }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

function hasAccount (account) {
    console.log ("Checking account " + account);
    return accounts.indexOf(account) != -1;
}

function persistAccount (account) {
    console.log ("Persisting account " + account);
    var client = redisHelper.connectToRedis(REDIS_URL);
    var redis = redisHelper.getRedis();
    client.hset ("accounts", account, "1", redis.print);
    client.quit();
}

function retrieveAccounts () {
    console.log ("Retrieving accounts");
    console.log ("== TBD ==");
}

function open(req, res) {
    account = req.params.account;
    console.log ("Opening account " + account);
    if (hasAccount (account)) {
        console.log ("Account already found");
    } else {
        persistAccount(account);
        accounts.push(account);
        queue.sendMessage(ACCOUNT_QUEUE, account);
    }
    res.send ("Account open");
}

function resetAccount (account) {
  var base_url = "http://microbank-account/reset/";

  url = base_url + account;
  console.log ("URL: " + url);

  var req = client.get(url, function(data, response) {
  });

}

function reset(req, res) {
    accounts.forEach(function (account) {
        console.log ("Resetting account " + account);
        resetAccount (account);
    });

    res.send ("Accounts reset");
}

function createAccountSystemTable() {
    stmt = "CREATE TABLE ACCOUNT_SYSTEM (ACCOUNT_NUMBER INTEGER PRIMARY KEY)"
    connection.query(stmt, function (error, result) {
        if (error) {
            console.log ("Error: ", error);
        }
        console.log ("Table created");
    })
}

createAccountSystemTable();
retrieveAccounts();

module.exports = {
    get: get,
    open: open,
    reset: reset
}