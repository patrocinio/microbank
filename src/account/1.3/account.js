var os = require('os');

var queue = require('./queue/queue');

var balance = 100;

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

function updateBalance(res, delta) {
    balance += parseInt(delta);

    getBalance(res); 
}

registerAccount();

module.exports = {
    get: function(req, res) {
        console.log ("Retrieving balance ")
        getBalance(res);
        console.log ("Returning result")
    },

    update: function(req, res) {
        delta = req.params.delta;
        updateBalance(res, delta);
    }
}