var os = require('os');

var queue = require('./queue/queue');
const LOG_QUEUE = "log";

function listenToLogQueue () {
    console.log ("==> Listening to the log queue..."); 
    queue.consumeMessage(LOG_QUEUE, function (message) {
        account = message.toString();
        console.log (message);
    }); 
}

listenToLogQueue();

module.exports = {
}