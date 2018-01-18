var Channel = require("./channel.js");

/*
function encode(doc) {  
  return new Buffer(JSON.stringify(doc));
}*/

function encode(message) {
  return new Buffer(message);
}

function sendMessage(queue, message) {
    console.log ("Sending message " + message);
    Channel(queue, function(err, channel, conn) {  
      if (err) {
        console.error ("Error in estabishing connection to RabbitMQ... Retrying");
        console.error (err.stack); 
        setTimeout(sendMessage(message), 1e3);
      }
      else {
        console.log('channel and queue created');
        channel.sendToQueue(queue, encode(message), {
          persistent: true
        });
        setImmediate(function() {
          channel.close();
          conn.close();
        });
      }
    });

  }

function consumeMessage(queue, callback) {
    console.log ("Waiting for a message");
    Channel(queue, function(err, channel, conn) {  
      if (err) {
        console.error(err.stack);
      }
      else {
        console.log('channel and queue created');
        consume();
      }

      function consume() {
        channel.get(queue, {}, onConsume);

        function onConsume(err, msg) {
          if (err) {
            console.warn(err.message);
          }
          else if (msg) {
            console.log('consuming %j', msg.content.toString());
            callback(msg.content);
            setTimeout(function() {
              channel.ack(msg);
              consume();
            }, 1e3);
          }
          else {
            // console.log('no message, waiting...');
            setTimeout(consume, 1e3);
          } // else
        } // onConsume
      } // consume
    }); // Channel
  } // consumeMessage

module.exports = {
  sendMessage : sendMessage,

  consumeMessage: consumeMessage
}; // exports   
