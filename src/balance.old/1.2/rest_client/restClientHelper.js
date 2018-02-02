var Client = require('node-rest-client').Client;
var client = new Client ();

function get (url, callback) {
  var req = client.get(url, function(data, response) {
    console.log ("Response status code: " + response.statusCode);
    if (response.statusCode == 200) {
    	callback (data, response);
    } else {
      console.log ("Trying again...");
      get (url, callback);
    }
  });

 req.on('error', function (err) {
    console.log('===> restClientHelper request error', err);
    get(url, callback);
  });

   return req;
}
module.exports = {
	get : get
}