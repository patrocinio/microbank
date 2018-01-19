var balance = 100;

var accounts = [];

var redisHelper = require('./redis/redisHelper');
var REDIS_URL = "redis://microbank-account-system-redis";

var queue = require('./queue/queue');
const ACCOUNT_QUEUE = "accounts";

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
}

function retrieveAccounts () {
    console.log ("Retrieving accounts");
    var client = redisHelper.connectToRedis(REDIS_URL);
    client.hkeys("accounts", function (err, replies) {
        console.log ("Found " + replies.length + " accounts");
        replies.forEach(function (reply, i) {
            console.log ("Account: " + reply);
            accounts.push(reply);
        })
    }) 
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

retrieveAccounts();

module.exports = {
    get: get,
    open: open
}