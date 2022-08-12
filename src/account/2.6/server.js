// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var account    = require('./account');
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
router.get('/balance/:account', function(req, res) {
	account.get(req, res);
});

router.get('/reset/:account', function (req, res) {
	account.reset(req, res);
});

router.get('/open/:account', function (req, res) {
	account.open(req, res);
});

router.get('/lock/:account', function (req, res) {
	account.lock(req, res);
});

router.post('/update', function(req, res) {
	account.update(req, res);
});

router.get('/', function(req, res) {
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

