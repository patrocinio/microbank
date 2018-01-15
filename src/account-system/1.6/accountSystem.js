var balance = 100;

var accounts = [];

require('./redis/redisHelper.js');
var REDIS_URL = "redis://microbank-account-system-redis";

var queue = require('./queue/queue');

function connectToRedis () {
    console.log ("Connecting to Redis");
    var client = redis.createClient("redis://microbank-account-system-redis");

    client.on("error", function (err) {
        console.log("==> Error " + err);
    });

    return client;
}

function getAccounts (res) {
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
    var client = connectToRedis(REDIS_URL);
    client.hset ("accounts", account, "1", redis.print);
}

function listenToQueue () {
    console.log ("Listening to the queue..."); 
    queue.consumeMessage(function (message) {
        account = message.toString();
        console.log ("Message: " + account);
        if (hasAccount (account)) {
            console.log ("Account already found");
        } else {
            persistAccount(account);
            accounts.push(account);
        }
    }); 
}

function retrieveAccounts () {
    console.log ("Retrieving accounts");
    var client = connectToRedis(REDIS_URL);
    client.hkeys("accounts", function (err, replies) {
        console.log ("Found " + replies.length + " accounts");
        replies.forEach(function (reply, i) {
            console.log ("Account: " + reply);
            accounts.push(reply);
        })
    }) 
}

retrieveAccounts();
listenToQueue();

module.exports = {
    get: function(req, res) {
        console.log ("Retrieving accounts")
        getAccounts(res)
        console.log ("Returning result")
    } 
}