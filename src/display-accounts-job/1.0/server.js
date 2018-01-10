var redis = require("redis");
var client = redis.createClient("redis://microbank-account-system-redis");

client.on("error", function (err) {
    console.log("==> Error " + err);
});

//setInterval(client.ping(), 1000 * 60 * 30);

function retrieveAccounts () {
    console.log ("Retrieving accounts");
    client.hkeys("accounts", function (err, replies) {
        console.log ("Found " + replies.length + " accounts");
        replies.forEach(function (reply, i) {
            console.log(reply);
        })
        client.quit(); 
    }) 
}


retrieveAccounts();

