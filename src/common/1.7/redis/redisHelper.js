var redis = require("redis");

function connectToRedis (url) {
    console.log ("Connecting to Redis at " + url);
    var client = redis.createClient(url);

    client.on("error", function (err) {
        console.log("==> Error " + err);
    });

    return client;
}

function getRedis () {
	return redis;
}

module.exports = {
	connectToRedis: connectToRedis,
	getRedis: getRedis
}