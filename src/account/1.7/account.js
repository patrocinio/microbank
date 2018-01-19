var os = require('os');

var queue = require('./queue/queue');
const ACCOUNT_QUEUE = "accounts";

var redisHelper = require('./redis/redisHelper');
var REDIS_URL = "redis://microbank-account-redis";

const INITIAL_BALANCE = 100;

function getBalance(account, callback) {
    console.log ("Getting balance for account " + account);

    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (account, function (err, reply) {
        if (reply == null) {
            console.log ("==> Balance not found for account " + account);
            balance = -4545;
        } else {
            console.log ("Found balance: " + reply.toString());
            balance = parseInt(reply.toString());
        }
        callback (balance);
    }); 
}

function buildResult (res, balance) {
    console.log ("Building result balance: " + balance);
    result = { "balance" : balance };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));

}

function get (req, res) {
    account = req.params.account;
    console.log ("Retrieving balance for account");
    balance = getBalance(account, function (balance) {
        buildResult(res, balance);
    });
}

function persistBalance(account, balance) {
    console.log ("Persisting balance of account " + account + " balance: " + balance);

    var client = redisHelper.connectToRedis(REDIS_URL); 
    client.set (account, balance);
}

function resetBalance(account) {
    balance = INITIAL_BALANCE;
    console.log ("Setting initial balance of account " + account + " to: " + balance);
    persistBalance(account, balance);
    return balance;
}

function reset(req, res) {
    console.log ("Params: ");
    console.log (req.params);
    account = req.params.account;
    balance = resetBalance(account);
    buildResult (res, balance);
}

function open(req, res) {
    reset(req, res);
}


function updateBalance(delta) {
    balance += parseInt(delta);
    persistBalance ();
}

function listenToQueue () {
    console.log ("==> Listening to the queue..."); 
    queue.consumeMessage(ACCOUNT_QUEUE, function (message) {
        account = message.toString();
        console.log ("==> Message: " + account);
        resetBalance (account);
    }); 
}



listenToQueue();


module.exports = {
    get: get,
    reset: reset,
    open: open
}