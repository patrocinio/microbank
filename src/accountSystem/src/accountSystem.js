var balance = 100;

var accounts = [];

function getAccounts (res) {
    result = { "accounts" : accounts }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

function registerAccount (res, account) {
	console.log ("Registering account " + account);
    accounts.push(account);
	res.send ("Account registered");
}


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