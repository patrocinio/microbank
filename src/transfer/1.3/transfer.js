var client = require('./rest_client/restClientHelper');

var queue = require('./queue/queue');

function updateAccount(res, account, amount) {
  console.log ("Sending " + amount + " to " + account); 
  queue.sendMessage (account, amount);
}

function transfer (res, from, to, amount) {

  console.log ("===> Transfering from account " + from + " to " + to + 
    " amount " + amount);
  updateAccount (res, from, amount.toString());
  var withdrawal = -amount;
  updateAccount (res, to, withdrawal.toString());
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