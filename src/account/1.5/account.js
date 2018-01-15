var os = require('os');

var queue = require('./queue/queue');
var redisHelper = require('./redis/redisHelper');
var REDIS_URL = "redis://microbank-account-redis";

const INITIAL_BALANCE = 100;
var balance;

var name = process.env.NAME;


function getBalance (res) {
    result = { "balance" : balance }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

function obtainAccountName () {
	hostname = os.hostname();
	array = hostname.split("-");

	// Normal name: microbank-john-account-...
	return array[1] + "-" + array[2];
}

function registerAccount() {
	name = obtainAccountName();
	queue.sendMessage(name);
}

function persistBalance() {
    console.log ("Persisting balance of account " + name + " balance: " + balance);

    var client = redisHelper.connectToRedis(REDIS_URL); 
    client.set (name, balance);
}

function updateBalance(res, delta) {
    balance += parseInt(delta);
    persistBalance ();

    getBalance(res); 
}

function resetBalance() {
    balance = INITIAL_BALANCE;
    console.log ("Setting initial balance to: " + balance);
    persistBalance();
}

function getInitialBalance() {
    console.log ("Getting balance for account " + name);

    var client = redisHelper.connectToRedis(REDIS_URL);
    client.get (name, function (err, reply) {
        if (reply == null) {
            resetBalance();
        } else {
            console.log ("Found balance: " + reply.toString());
            balance = parseInt(reply.toString());
        }
    });
}

function reset(res) {
    resetBalance();
    getBalance(res);
}

registerAccount();
getInitialBalance();

module.exports = {
    get: function(req, res) {
        console.log ("Retrieving balance ")
        getBalance(res);
        console.log ("Returning result")
    },

    update: function(req, res) {
        delta = req.params.delta;
        updateBalance(res, delta);
    },

    reset: function(req, res) {
        reset(res);
    }
}