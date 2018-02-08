var mysql = require('node-mysql');

function connect () {
  console.log ("Connecting to DB...");

  connection = mysql.createConnection({
    host     : 'microbank-account-commit-mariadb',
    user     : 'root',
    password : 'admin',
    database : 'operations'
  });

  connection.connect();
  console.log ("Connected to DB");
}

module.exports = {
	connect : connect
}