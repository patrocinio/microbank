var os = require('os');

var queue = require('./queue/queue');
const LOG_QUEUE = "log";

function listenToLogQueue () {
    console.log ("==> Listening to the log queue..."); 
    queue.consumeMessage(LOG_QUEUE, function (channel, message) {
    	console.log ("==> " + new Date().toString());
        console.log (message.content.toString ());
        queue.ack (channel, message);
    }); 
}

listenToLogQueue();

module.exports = {
}