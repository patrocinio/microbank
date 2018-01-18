const Slack = require('@slack/client');

console.log('Getting started with Slack Developer Kit for Node.js');

//urL = process.env.SLACK_WEBHOOK_URL;
url = "https://hooks.slack.com/services/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";

const notification = new Slack.IncomingWebhook (url);

module.exports = {
	send : function (message) {
		notification.send(message, (error, resp) => {
  			if (error) {
    			return console.error(error);
  			}
  		console.log('Notification sent');   
		});
	}
}

