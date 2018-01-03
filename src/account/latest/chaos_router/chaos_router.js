function getRandom () {
	return Math.random();
}

function returnError (res) {
	console.log("Chaos Router returning 500");
	res.status(500).send("Chaos Router in action");
}

function chaos (req, res, next) {
	r = getRandom();
	if (r < 0.1) {
		returnError (res);
	} else {
		next ();
	}
}

module.exports = chaos;