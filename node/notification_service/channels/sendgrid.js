const helper = require('../../utilities/helper');
const sendgridMail = require('@sendgrid/mail');
const sendgridClient = require('@sendgrid/client');
const AbstractChannel = require('./abstract');

class SendgridChannel extends AbstractChannel {
    async sendNotification(user, data) {
        if(!user.email) {
            this.logger.error({ service: 'SendGrid', msg: `Error during sending email. 'email' property is required in user object`, data: user });
        }

        let email = {
            to: user.name + ' <' + user.email + '>',
            from: this.config.from_name + ' <' + this.config.from_email + '>',
            replyTo: this.config.from_name + ' <' + this.config.from_email + '>',
            subject: this.config.subject,
            text: 'This email uses HTML, please use a mail client that supports this.',
            html: '<p>This email uses HTML, please use a mail client that supports this.</p>',
            templateId: this.config.template_id,
            substitutionWrappers: ['{{', '}}'],
            dynamicTemplateData: data,
            headers: {
                'X-Accept-Language': 'en',
                'X-Mailer': 'AM Platform - Notification Manager',
            },
            hideWarnings: options.environment !== 'development',
            /*
            mail_settings: {
                sandbox_mode: {
                    enable: options.environment === 'development'
                }
            }
            */
        };

        // Send the email
        sendgridMail.setApiKey(this.config.api_key);
        sendgridMail.send(email).then(function([response, body]) {
            // Check status code
            if (response.statusCode === 202) {
                this.logger.info({ service: 'SendGrid', msg: `Email notification was sent successfully.` });
            } else {
                this.logger.error({ service: 'SendGrid', msg: `Email notification failed to send, status code:`, data: response });
            }
        }).catch(function(err) {
            this.logger.error({ service: 'SendGrid', msg: `Email notification failed to send`, data: response });
        });
    }
}

module.exports = SendgridChannel;