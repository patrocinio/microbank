var Client = require('node-rest-client').Client;

var client = new Client ();

function getAccounts (res) {
  var url = "http://account-system-account-system.microbank.svc.cluster.local/accounts";
  client.get(url, function (data, response) {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
  });
}

function validateBalance (res) {
  getAccounts(res);
}


module.exports = {
    get: function(req, res) {
        console.log ("Validating balance ")
        validateBalance(res)
        console.log ("Returning result")
    }
}