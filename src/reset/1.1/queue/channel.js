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
      console.log('connected');
      conn.createChannel(onceChannelCreated);
    }
    function onceChannelCreated(err, channel) {
      console.log ("onceChannelCreated");
      if (err) {
        cb(err);
      }
      else {
        console.log('channel created');
        channel.assertQueue(queue, {durable: true}, onceQueueCreated);
      }

      function onceQueueCreated(err) {
        console.log ("onceQueueCreated");
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
