var client = require('./rest_client/restClientHelper');

function updateAccount(res, account, amount) {
  var url = "http://microbank-" + account + "/update/" + amount;
  console.log ("URL: " + url);
  client.get(url, function (data, response) {
    console.log ("Account " + account + " updated. Status: " + response.statusCode);
    console.log (data);
  });
}

function transfer (res, from, to, amount) {

  console.log ("===> Transfering from account " + from + " to " + to + 
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