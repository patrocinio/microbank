var os = require('os');

var client = require('./rest_client/restClientHelper');

var logger = require('./logger/logger');

var sql = require('./postgres/postgres');

var queue = require('./queue/queue');
const EXPIRE_QUEUE = "expire";

function listenToExpireQueue () {
    console.log ("==> Listening to the expire queue..."); 
    sql.connect ();
    queue.consumeMessage(EXPIRE_QUEUE, function (channel, message) {
        account = message.toString();
        console.log ("==> Message: " + message);
    }); 
}

listenToExpireQueue();

module.exports = {
}