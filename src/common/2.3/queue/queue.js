var Channel = require("./channel.js");

function encode(message) {
  return new Buffer(message);
}

function sendMessage(queue, message) {
    console.log ("Sending message " + message + " to queue " + queue);
    Channel(queue, function(err, channel, conn) {  
      if (err) {
        console.error ("Error in estabishing connection to RabbitMQ... Retrying");
        console.error (err.stack); 
        setTimeout(sendMessage, 1e3, queue, message);
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

function ack(channel, message) {
  channel.ack (message);
}

function consumeMessage(queue, callback) {
    console.log ("Waiting for a message");
    Channel(queue, function(err, channel, conn) {  
      if (err) {
        console.error ("Error in estabishing connection to RabbitMQ... Retrying");
        console.error (err.stack); 
        setTimeout(consumeMessage, 1e3, queue, callback);
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
//            callback(msg.content);
            callback(channel, msg);
            setTimeout(function() {
//              channel.ack(msg);
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
  consumeMessage: consumeMessage,
  ack: ack
}; // exports   
