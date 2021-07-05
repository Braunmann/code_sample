class AbstractEvent {
    constructor(config) {
        this.config = {}
        this.channels = []
        this.logger = console;
        this.subscriber = new EventEmitter;
        this.setupConfig(config)
        this.initEvent();
    }
    setupConfig(config) {
        this.config = config;
    }
    setChannels(channels) {
        this.channels = channels;
    }
    setLogger(logger) {
        this.logger = logger;
    }
    setSubscriber(subscriber) {
        this.subscriber = subscriber;
    }
    initEvent() {

    }
    async broadcastNotification(users, data) {
        let lot_data = await this.getLotData(data);
        lot_data = {
            ...lot_data,
            ...this.generateParams(lot_data)
        }

        // Overwrite recipients if development env
        if(options.environment === 'development') {
            users = options.test_recipients
        }

        users.forEach((user) => {
            this.broadcastAcrossChannels(user, lot_data)
        })
    }
    broadcastAcrossChannels(user, data) {
        this.channels.forEach((channel) => {
            channel.sendNotification(user, data);
        })
    }
    async getUsersToNotify(lot) {
        if(!this.config.userSqlQuery) {
            helper.log.error({ service: 'Notification Service', msg: `${this.constructor.name}: getUsersToNotify:userSqlQuery in not configured`});
            return [];
        }
        const sqlQuery = helper.replaceVariables(this.config.userSqlQuery, lot);
        const [ rows ] = await mysqlPool.query(sqlQuery);
        return rows;
    }

    async getLotData(lot) {
        if(!this.config.dataSqlQuery) {
            helper.log.error({ service: 'Notification Service', msg: `${this.constructor.name}: getUsersToNotify:userSqlQuery in not configured`});
            return lot;
        }
        const sqlQuery = helper.replaceVariables(this.config.dataSqlQuery, lot);
        const [ rows ] = await mysqlPool.query(sqlQuery);
        return rows[0] ? rows[0] : lot;
    }

    generateParams(data) {
        if(!this.config.params) {
            return {}
        }
        return helper.replaceVariables(this.config.params, data)
    }
}
module.exports = AbstractEvent;