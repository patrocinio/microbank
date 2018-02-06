var os = require('os');

var queue = require('./queue/queue');
const ACCOUNT_QUEUE = "accounts";
const UPDATE_QUEUE = "update";

var redisHelper = require('./redis/redisHelper');
var REDIS_URL = "redis://microbank-account-redis";

var logger = require('./logger/logger');

const INITIAL_BALANCE = 100;

function getBalanceKey (account) {
    return account + ".balance";
}

function getLockKey (account) {
    return account + ".lock";
}

function getBalance(account, callback) {
    console.log ("Getting balance for account " + account);

    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (getBalanceKey (account), function (err, reply) {
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

function getLock(account, callback) {
    console.log ("Getting lock for account " + account);

    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (getLockKey (account), function (err, reply) {
        if (reply == null) {
            console.log ("==> Lock not found for account " + account);
            lock = 0;
        } else {
            console.log ("Found lock: " + reply.toString());
            lock = reply;
        }
        callback (lock);
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
    client.set (getBalanceKey (account), balance);

    logger.logMessage ("Account " + account + " updated with balance " + balance);
}

function persistLock (account, timestamp) {
    console.log ("Persisting lock account " + account + " timestamp: " + timestamp);
    var client = redisHelper.connectToRedis(REDIS_URL); 
    client.set (getLockKey (account), timestamp);

}

function unlock(account) {
    console.log ("Unlocking account " + account);
    persistLock (account, 0);
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
    unlock(account);
    buildResult (res, balance);
}

function open(req, res) {
    reset(req, res);
}


function updateBalance(account, delta) {
    getBalance (account, function (balance) {
        console.log ("Original balance: " + balance);
        balance += parseInt(delta);
        console.log ("New balance: " + balance);
        persistBalance (account, balance);
        unlock (account);
    });
}

function listenToAccountQueue () {
    console.log ("==> Listening to the account queue..."); 
    queue.consumeMessage(ACCOUNT_QUEUE, function (message) {
        account = message.toString();
        console.log ("==> Message: " + account);
        resetBalance (account);
    }); 
}

function update(req, res) {
    console.log ("==> Update account");
    console.log ("Body: ");
    console.log (req.body);
    account = req.body.account;
    amount = req.body.amount;
    updateBalance (account, amount);
}

function lock(req, res) {
    account = req.params.account;
    console.log ("Locking account " + account);
    getLock (account, function (timestamp) {
        console.log ("Accont " + account + " timestamp: " + timestamp);
        if (timestamp != 0) {
            res.status(400).send ("Account " + account + " already locked timestamp: " + timestamp);
        } else {
            persistLock (account, new Date());
            res.send ("Account " + account + " locked");
        }
    })
}

listenToAccountQueue();

module.exports = {
    get: get,
    reset: reset,
    open: open,
    update: update,
    lock: lock
}