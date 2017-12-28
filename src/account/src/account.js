var balance = 100;

function getBalance (res) {
    result = { "balance" : balance }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}


module.exports = {
    get: function(req, res) {
        console.log ("Retrieving balance ")
        getBalance(res)
        console.log ("Returning result")
    }
}