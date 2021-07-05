const helper = require('../../utilities/helper');
const twilio = require('twilio');
const AbstractChannel = require('./abstract');

class TwilloChannel extends AbstractChannel {
    async sendNotification(user, data) {
        try {
            const user_phone = helper.normalizeMobilePhone(user);
            const client = twilio(this.config.account_sid, this.config.auth_token);
            client.messages.create({
                body: helper.replaceVariables(this.config.text_body, {...data, user}),
                from: this.config.from_phone,
                to: user_phone
            }).then(message => {
                this.logger.info({service: 'Twillo', msg: `SMS notification was sent successfully.`});
            }).catch((err) => {
                this.logger.error({service: 'Twillo', msg: `SMS notification failed to send`, data: err});
            });
        } catch(err) {
            this.logger.error({service: 'Twillo', msg: `SMS notification failed to send`, data: err});
        }
    }
}

module.exports = TwilloChannel;