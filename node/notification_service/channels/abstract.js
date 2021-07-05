class AbstractChannel {
    constructor(config) {
        this.config = {}
        this.logger = console;
        this.setupConfig(config)
        this.initChannel();
    }
    setupConfig(config) {
        this.config = config;
    }
    setLogger(logger) {
        this.logger = logger;
    }
    initChannel() {

    }
    sendNotification(user, data) {
        this.logger.error({service: 'Notification Service', msg: `There is no configured sendNotification() for channel: ${this.constructor.name}`});
    }
}
module.exports = AbstractChannel;