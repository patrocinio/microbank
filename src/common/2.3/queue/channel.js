const AMQP = require('amqplib/callback_api');

const URL = 'amqp://guest:guest@microbank-rabbitmq.microbank.svc.cluster.local:5672';

module.exports = createQueueChannel;

function createQueueChannel(queue, cb) {  
	console.log ("Connecting to RabbitMQ. ");
  AMQP.connect(URL, onceConnected);

  function onceConnected(err, conn) {
    console.log ("onceConnected");
    if (err) {
      cb(err);
    } 
    else {
      conn.createChannel(onceChannelCreated);
    }
    function onceChannelCreated(err, channel) {
      if (err) {
        cb(err);
      }
      else {
        channel.assertQueue(queue, {durable: true}, onceQueueCreated);
      }

      function onceQueueCreated(err) {
        if (err) {
          cb(err);
        }
        else {
          cb(null, channel, conn);
        }
      } // onceQueueCreated
    } // onceChannelCreated
  } // onceConnected
} // createQueueChannel
