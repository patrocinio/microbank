var Client = require('node-rest-client').Client;
var client = new Client ();

function get (url, callback) {
  var req = client.get(url, function(data, response) {
    console.log ("Rest client get response status code: " + response.statusCode);
    if (response.statusCode == 200 || response.statusCode == 400 || response.statusCode == 404) {
      callback (data, response);
    } else {
      console.log ("Trying again in 1 sec... URL: " + url);
      setTimeout(get, 1e3, url, callback);
    }
  });

 req.on('error', function (err) {
    console.log('===> restClientHelper request error for ', url);
    get(url, callback);
  });

   return req;
}

function post (url, args, callback) {
  var req = client.post(url, args, function(data, response) {
    console.log ("Rest Client post response status code: " + response.statusCode);
    if (response.statusCode == 200 || response.statusCode == 400) {
      callback (data, response);
    } else {
      console.log ("Trying again in 1 sec...");
      setTimeout(post, 1e3, url, args, callback);
    }
  });

 req.on('error', function (err) {
    console.log('===> restClientHelper request error for ', url);
    post(url, args, callback);
  });

   return req;
}


module.exports = {
	get : get,
  post: post
}