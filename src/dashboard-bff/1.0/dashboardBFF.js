function getOverallBalance (req, res) {
    result = { "balance" : 500 };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

function getTransactionCount (req, res) {
    result = { "transactionCount" : 123 };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));

}

function getTransactionHistory (req, res) {
    result = { 
      history: [
        "Transfering $45 from account-0 to account-1",
        "Transfering $9 from account-1 to account-0" 
      ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

function getPods (req, res) {
    result = {
      pods: [ 
        "Pod-1",
        "Pod-2" 
      ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

module.exports = {
  getOverallBalance : getOverallBalance,
  getTransactionCount : getTransactionCount,
  getTransactionHistory : getTransactionHistory,
  getPods : getPods
}