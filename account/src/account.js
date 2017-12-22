int balance = 100;

function getBalance (res) {
    res = balance;
}


module.exports = {
    getBalance: function(req, res) {
        console.log ("Retrieving balance ")
        getBalance(res)
    }
}