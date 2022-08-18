var os = require('os');

var queue = require('./queue/queue');
const ACCOUNT_QUEUE = "accounts";
const UPDATE_QUEUE = "update";

var mysql = require('./mysql/mysql')
var connection = mysql.connect();

var logger = require('./logger/logger');

const INITIAL_BALANCE = 100;

function getBalanceKey (account) {
    return account + ".balance";
}

function getLockKey (account) {
    return account + ".lock";
}

function getBalance(account, callback) {
    console.log ("Getting balance for account " + account);

    connection.query("SELECT BALANCE FROM ACCOUNT WHERE ACCOUNT_NUMBER = " + account, 
    function(error, results, fields) {
        if (error) {
            throw error;
        }
        if (!results.length) {
            console.log ("==> Balance not found for account " + account);
            balance = -4545;
        } else {
            console.log ("Found results: " + JSON.stringify(results));
            result = results[0]
            console.log ("Found result: " + JSON.stringify(result));
            console.log ("Found balance: " + JSON.stringify(result['BALANCE']));
          
            balance = result['BALANCE'];
        }
        callback (balance);
    }); 
}

function buildResult (res, balance) {
    console.log ("Building result balance: " + balance);
    result = { "balance" : balance };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));

}

function get (req, res) {
    account = req.params.account;
    console.log ("Retrieving balance for account");
    balance = getBalance(account, function (balance) {
        buildResult(res, balance);
    });
}

function persistBalance(res, account, balance) {  
    console.log ("Persisting balance of account " + account + " balance: " + balance);

    connection.query("UPDATE ACCOUNT SET BALANCE = " + balance + 
        " WHERE ACCOUNT_NUMBER = "  + account, 
    function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            logger.logMessage ("==> Account " + account + " updated with balance " + balance);
            console.log ("Account updated");
            buildResult (res, balance);

        }
    });

}

function persistLock (account, timestamp) {
    console.log ("Persisting lock account " + account + " timestamp: " + timestamp);
    var client = redisHelper.connectToRedis(REDIS_URL); 
    console.log ("==> Key: " + getLockKey (account) + " timestamp: " + timestamp);
    client.set (getLockKey (account), timestamp);
    client.quit ();

}

function unlock(account) {
    console.log ("Unlocking account " + account);
    persistLock (account, 0);
}

function resetBalance(res, account) {
    balance = INITIAL_BALANCE;
    console.log ("Setting initial balance of account " + account + " to: " + balance);
    persistBalance(res, account, balance);
    return balance;
}

function reset(req, res) {
    console.log ("Params: ");
    console.log (req.params);
    account = req.params.account;
    balance = resetBalance(res, account);
}

function open(req, res) {
    console.log ("Params: ");
    console.log (req.params);
    account = req.params.account;


    connection.query("INSERT INTO ACCOUNT (ACCOUNT_NUMBER, BALANCE) VALUES (" + account + 
        ", " + INITIAL_BALANCE + ")", 
    function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log ("Account created");
            balance = parseInt(results.toString());
        }
        res.send ("Account created");
    }); 

}


function updateBalance(res, account, delta) {
    getBalance (account, function (balance) {
        console.log ("Original balance: " + balance);
        balance += parseInt(delta);
        console.log ("New balance: " + balance);
        persistBalance (res, account, balance);
    });
}

function listenToAccountQueue () {
    console.log ("==> Listening to the account queue..."); 
    queue.consumeMessage(ACCOUNT_QUEUE, function (channel, message) {
        console.log ("channel: " + channel);
        console.log ("message:" + message);
        
        account = message.content.toString();
        console.log ("==> Account: " + account);
        resetBalance (account);
        queue.ack (channel, message);
    }); 
}

function update(req, res) {
    console.log ("==> Update account");
    console.log ("Body: ");
    console.log (req.body);
    account = req.body.account;
    amount = req.body.amount;
    updateBalance (res, account, amount);
}

function lock(req, res) {
    account = req.params.account;
    console.log ("Locking account " + account);

    console.log ("== TBD ===");
    res.send ("Account locked");
}

function createAccountTable() {
    stmt = "CREATE TABLE ACCOUNT (ACCOUNT_NUMBER INTEGER PRIMARY KEY, BALANCE INTEGER)"
    connection.query(stmt, function (error, result) {
        if (error) {
            console.log ("Error: ", error);
        }
        console.log ("Table created");
    })
}

listenToAccountQueue();
createAccountTable();

module.exports = {
    get: get,
    reset: reset,
    open: open,
    update: update,
    lock: lock
}