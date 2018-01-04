var redis = require("redis");
var client = redis.createClient("redis://microbank-redis");

function retrieveAccounts () {
    console.log ("Retrieving accounts");
    client.hkeys("accounts", function (err, replies) {
        console.log ("Found " + replies.length + " accounts");
        replies.forEach(function (reply, i) {
            console.log(reply);
        })
    }) 
}

retrieveAccounts();

