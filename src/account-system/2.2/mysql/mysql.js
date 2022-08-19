var mysql = require('mysql');

function connect () {
  console.log ("Connecting to DB...");

  connection = mysql.createConnection({
    host     : 'microbank-account-system-mysql',
    user     : 'root',
    password : 'admin',
    database : 'account-system'
  });

  connection.connect();
  console.log ("Connected to DB");
  return connection;
}

module.exports = {
	connect : connect
}