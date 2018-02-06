var queue = require('./queue/queue');
const UPDATE_QUEUE = "update";

var logger = require('./logger/logger');

function updateAccount(res, account, amount) {
  message = { account : account, amount: amount };

  console.log ("Sending " + amount + " to " + account); 
  logger.logMessage ("Sending " + amount + " to " + account); 

  queue.sendMessage (UPDATE_QUEUE, JSON.stringify(message)); 
}

function transfer (res, from, to, amount) {

  console.log ("===> Transfering from account " + from + " to " + to + 
    " amount " + amount);
  logger.logMessage ("Transfering from account " + from + " to " + to + 
    " amount " + amount);

  var withdrawal = -amount;
  updateAccount (res, from, withdrawal.toString());
  updateAccount (res, to, amount.toString());
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