var Client = require('node-rest-client').Client;
var client = new Client ();

const notification = require('./notification');

function validateBalance () {
	console.log ("Calling validate..."); 
   var url = "http://microbank-manager-balance-validator/validate";
   console.log ("Connecting to the following URL " + url);
   var req = client.get(url, function (data, response) {
     console.log (data.toString());
     if (response.statusCode == 200) {
     	console.log ("Succeeded");
      notification.send ("Validation succeeded");
     } else {
     	console.log ("PROBLEM!!");
      notification.send ("Validation failed: " + data.toString());
     }
   });

   req.on('error', function (err) {
      console.log('request error', err);
    }); 
 }
   
 
 validateBalance();     