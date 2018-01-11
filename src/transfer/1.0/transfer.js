var Client = require('node-rest-client').Client;
var client = new Client ();

function updateAccount(res, account, amount) {
  var url = "http://microbank-" + account + "/update/" + amount;
  console.log ("URL: " + url);
  client.get(url, function (data, response) {
    console.log ("Account " + account + " updated");
  });
}

function transfer (res, from, to, amount) {

  console.log ("Transfering from account " + from + " to " + to + 
    " amount " + amount);
  updateAccount (res, from, amount);
  updateAccount (res, to, -amount);
  res.send("Done!");
}


module.exports = {
    transfer: function(req, res) {
      console.log ("Body: ");
      console.log (req.body);
      from = req.body.from;
      to = req.body.to;
      amount = req.body.amount;
      transfer (res, from, to, amount);
    }
}