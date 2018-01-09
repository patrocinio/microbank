var Client = require('node-rest-client').Client;
var client = new Client ();
var os = require('os');

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

function registerAccount () {
	name = obtainAccountName();
	console.log ("Registering " + name);

	var url = "http://microbank-account-system/register/" + name;
	console.log ("URL: " + url);
	client.get(url, function (data, response) {
  });

}

registerAccount();

module.exports = {
    get: function(req, res) {
        console.log ("Retrieving balance ")
        getBalance(res)
        console.log ("Returning result")
    }
}