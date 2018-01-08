var Client = require('node-rest-client').Client;
var client = new Client ();

function validateBalance () {
	console.log ("Calling validate..."); 
   var url = "http://microbank-manager-balance-validator/validate";
   client.get(url, function (data, response) {
     console.log (data.toString());
     if (response.statusCode == 200) {
     	console.log ("Succeeded");
     } else {
     	console.log ("PROBLEM!!");
     }
   });
 }
 
 
 validateBalance(); 