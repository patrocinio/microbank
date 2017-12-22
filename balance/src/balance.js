var Client = require('node-rest-client').Client;

var client = new Client ();

function getBalance (res, account) {

	var url = "http://" + account + "-" + account + "/balance";
	console.log ("URL: " + url);
	client.get(url, function (data, response) {
	  res.setHeader('Content-Type', 'application/json');
  	  res.send(JSON.stringify(data));
  	});

}


module.exports = {
    get: function(req, res) {
    	account = req.params.account
        console.log ("Retrieving balance for account " + account)
        getBalance(res, account)
        console.log ("Returning result")
    }
}