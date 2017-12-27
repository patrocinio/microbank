function chaos (req, res, next) {
	console.log ("Chaos Router in action");
	next ();
}

module.exports = chaos;