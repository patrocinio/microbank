var Client = require('node-rest-client').Client;
var client = new Client ();

function get(url, f) {
	client.get(url, f);
}