var queue = require('../queue/queue');
var os = require ('os');

const LOGGING_QUEUE = "log";

function logMessage(message) {
  console.log ("Logging " + message + " hostname " + os.hostname()); 
  args = {
  	hostname: os.hostname(),
  	message: message
  }
  queue.sendMessage (LOGGING_QUEUE, JSON.stringify(args)); 
}

module.exports = {
    logMessage: logMessage
}