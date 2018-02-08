var Channel = require("./queue/channel.js");

const UPDATE_QUEUE = "update";
var queue = UPDATE_QUEUE;

function check (req, res) {
    console.log ("Waiting for a message");
    Channel(queue, function(err, channel, conn) {  
      if (err) {
        console.error ("Error in estabishing connection to RabbitMQ... Retrying");
        console.error (err.stack); 
        setTimeout(check, 1e3, req, res);
      }
      else {
        console.log('channel and queue created');
        consume();
      }

      function consume() {
        message = channel.get(queue, {}, onConsume);

        function onConsume(err, msg) {
          if (err) {
            console.warn(err.message);
          }
          else if (msg) {
            console.log ("Found message " + msg.content);
            res.status(400).send ("There are pending messages");
          }
          else {
            // console.log('no message, waiting...');
            res.send ("No messages found");
          } // else
        } // onConsume
      } // consume
    }); // Channel
  } // check

function reset (req, res) {
    console.log ("Waiting for a message");
    Channel(queue, function(err, channel, conn) {  
      if (err) {
        console.error ("Error in estabishing connection to RabbitMQ... Retrying");
        console.error (err.stack); 
        setTimeout(check, 1e3, req, res);
      }
      else {
        console.log('channel and queue created');
        consume();
      }

      function consume() {
        console.log ("Destroying queue...");
        channel.purgeQueue (queue);
      } // consume
    }); // Channel
  } // checkEmptyChannel





module.exports = {
  check: check,
  reset: reset
}