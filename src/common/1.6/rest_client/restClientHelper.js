var Client = require('node-rest-client').Client;
var client = new Client ();

function get (url, callback) {
  return client.get(url, function(data, response) {
    console.log ("Response status code: " + response.statusCode);
    if (response.statusCode == 200) {
    	callback (data, response);
    } else {
      console.log ("Trying again...");
      get (url, callback);
    }
  });

}
module.exports = {
	get : get
}