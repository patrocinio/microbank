var client = require('./rest_client/restClientHelper');

function resetAccounts () {
  console.log ("Getting all accounts");
  var url = "http://microbank-account-system/reset";
  var req = client.get(url, function (data, response) {
  });

}
   
resetAccounts();  
