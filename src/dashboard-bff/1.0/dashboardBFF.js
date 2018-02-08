var client = require('./rest_client/restClientHelper');


function displayData (data) {
  console.log ("Data:");
  console.log (data);
  if (data.type == "Buffer") {
    console.log ("Found a buffer!");
    buf = Buffer.from(data.data);
    console.log (buf.toString());
  }

  if (Buffer.isBuffer (data)) {
    console.log ("Found a buffer!!");
    console.log (data.toString());
  }
}

function getOverallBalance (req, res) {
  var url = "http://microbank-manager-balance-validator/getBalance";

  console.log ("Connecting to URL " + url);
  client.get (url, function (data, response) {
    console.log ("Status " + response.statusCode);

    console.log ("Returning " + data);
    displayData (data);
    res.send (data);
  });

}

function getTransactionCount (req, res) {
    var url = "http://microbank-transfer.microbank.svc.cluster.local/getTransactionCount";
    
  console.log ("Connecting to URL " + url);
  client.get (url, function (data, response) {
    console.log ("Status " + response.statusCode);

    console.log ("Returning " + data);
    displayData (data);
    res.send (data);
  });

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