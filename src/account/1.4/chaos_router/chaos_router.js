ERROR_THRESHOLD = 0.1; // between 0.0 (no error) and 1.0 (100% of error)

function getRandom () {
	return Math.random();
}

function returnError (res) {
	console.log("Chaos Router returning 500");
	res.status(500).send("Chaos Router in action");
}

function chaos (req, res, next) {
	r = getRandom();
	if (r < ERROR_THRESHOLD) {
		returnError (res);
	} else {
		next ();
	}
}

module.exports = chaos;