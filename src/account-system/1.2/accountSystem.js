var balance = 100;

var accounts = [];

var redis = require("redis");
var client = redis.createClient("redis://microbank-redis");

client.on("error", function (err) {
    console.log("==> Error " + err);
});

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
    client.hset ("accounts", account, "1", redis.print);
}

function registerAccount (res, account) {
	console.log ("Registering account " + account);
    if (hasAccount (account)) {
        console.log ("Account already found");
    } else {
        persistAccount(account);
        accounts.push(account);
    }
    console.log ("accounts: " + accounts);
	res.send ("Account registered");
}

function retrieveAccounts () {
    console.log ("Retrieving accounts");
    client.hkeys("accounts", function (err, replies) {
        console.log ("Found " + replies.length + " accounts");
        replies.forEach(function (reply, i) {
            console.log ("Account: " + reply);
            accounts.push(reply);
        })
    }) 
}

retrieveAccounts();

module.exports = {
    get: function(req, res) {
        console.log ("Retrieving accounts")
        getAccounts(res)
        console.log ("Returning result")
    },

    register: function(req, res) {
     	account = req.params.account;
    	registerAccount(res, account);
    }
}