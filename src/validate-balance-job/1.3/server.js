var client = require('./rest_client/restClientHelper');

const notification = require('./notification');

function validateBalance () {
	console.log ("Calling validate..."); 
   var url = "http://microbank-manager-balance-validator/validate";
   console.log ("Connecting to the following URL " + url);
   var req = client.get(url, function (data, response) {
     console.log (data.toString());
     console.log ("Succeeded");
    notification.send ("Validation succeeded");
   });
 }
   
 
 validateBalance();     