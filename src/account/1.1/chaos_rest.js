var Client = require('node-rest-client').Client;
var client = new Client ();

module.exports = {
    get: function (url, f) {
		client.get(url, f);
	}
}