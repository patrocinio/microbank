var queue = require('../queue/queue');

const LOGGING_QUEUE = "log";

function logMessage(message) {
  console.log ("Logging " + message); 
  queue.sendMessage (LOGGING_QUEUE, JSON.stringify(message)); 
}

module.exports = {
    logMessage: logMessage
}