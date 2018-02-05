var os = require('os');

var queue = require('./queue/queue');
const LOG_QUEUE = "log";

function listenToLogQueue () {
    console.log ("==> Listening to the log queue..."); 
    queue.consumeMessage(LOG_QUEUE, function (message) {
    	console.log ("==> " + new Date().toString());
        console.log (message.toString ());
    }); 
}

listenToLogQueue();

module.exports = {
}