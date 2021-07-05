const fs = require('fs');

class NotificationService {
    constructor() {
        this.config = {};
        this.logger = console;
        this.events = [];
        this.registerEvents();
    }

    setConfig(config) {
        this.config = config;
    }

    setLogger(logger) {
        this.logger = logger;
    }

    setupChannelsInstancesForEvent(channelConfigs) {
        let channels = [];
        channelConfigs.forEach((channel) => {
            try {
                const path = options.base.directory + '/notification_service/channels/' + channel.channel_name + '.js';
                if (fs.existsSync(path)) {
                    const item = require(path);
                    const config = channel.config ? channel.config : {};
                    const instance = new item(config);
                    instance.setLogger(this.logger);
                    channels.push(i);
                }
            } catch(err) {
                this.logger.error({ service: `Notification Service`, msg: `Error due registering ${channel.channel_name}...`, data: err});
            }
        })
        return channels;
    }

    registerEvents() {
        fs.readdirSync(options.base.directory + '/notification_service/events').forEach(file => {
            if(file === 'abstract.js') {
                // Do not register abstract event
                return
            }
            const item = require(options.base.directory + '/notification_service/events/' + file);
            this.logger.info({ service: `Notification Service`, msg: `Registering ${item.name}...`});

            const config = this.config[item.name]?.config ? this.config[item.name].config : {};
            const instance = new item(config);
            instance.setLogger(this.logger);

            const channels = this.config[item.name]?.channels ? this.config[item.name].channels : [];
            instance.setChannels(this.setupChannelsInstancesForEvent(channels));

            this.events.push(instance);
        });
    }
}

const service = new NotificationService()
module.exports = service;