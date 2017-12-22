var balance = 100;

function getAccounts (res) {
    result = { "accounts" : [ "john-account", "mary-account" ] }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}


module.exports = {
    get: function(req, res) {
        console.log ("Retrieving accounts")
        getAccounts(res)
        console.log ("Returning result")
    }
}