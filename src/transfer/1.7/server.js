// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var transfer   = require('./transfer');
var chaos      = require('./chaos_router/chaos_router.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

app.use (chaos);

// test route to make sure everything is working (accessed at GET http://localhost:80/api)
router.post('/transfer', function(req, res) {
	transfer.transfer(req, res);
});

router.get('/getTransactionCount', function(req, res) {
	transfer.getTransactionCount(req, res);
});

router.get('/reset', function(req, res) {
	transfer.reset(req, res);
});

router.get('/', function(req, res) {
	console.log ("Returning healthy")
	res.send("I'm healthy")
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

