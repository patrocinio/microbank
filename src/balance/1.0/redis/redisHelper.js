var redis = require("redis");

function connectToRedis (url) {
    console.log ("Connecting to Redis at " + url);
    var client = redis.createClient(url);

    client.on("error", function (err) {
        console.log("==> Error " + err);
    });

    return client;
}

module.exports = {
	connectToRedis: connectToRedis
}