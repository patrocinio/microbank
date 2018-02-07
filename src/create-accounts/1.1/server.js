var client = require('./rest_client/restClientHelper');

const MAX_ACCOUNTS = 5;

function createAccounts () {
   var base_url = "http://microbank-account-system/open/";
	for (i = 0 ;i < MAX_ACCOUNTS; i++) {
		account = "account-" + i;
		url = base_url + account;
		console.log ("Creating account " + account);
	   	var req = client.get(url, function (data, response) {
    		console.log (data.toString());
     		console.log ("Succeeded");
   		});
	}
 }
   
 
 createAccounts();     