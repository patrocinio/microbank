var client = require('./chaos_rest.js')

function getBalance (res, account) {

	var url = "http://microbank-" + account + "/balance";
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