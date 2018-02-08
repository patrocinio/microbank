const { Pool, Client } = require('pg');
const client = new Client({
  user: 'user',
  host: 'microbank-account-commit-postgresql',
  database: 'account-commit',
  password: 'password',
  port: 5432,
});

function connect () {

  console.log ("Connecting to DB... client: " + client);

  client.connect();

  console.log ("Connected to DB");
}

function end () {
  console.log ("Ending DB connection");
  client.end ();

}

module.exports = {
	connect : connect,
  end: end
}