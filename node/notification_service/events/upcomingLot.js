const helper = require('../../utilities/helper');
const cron = require('node-cron');
const AbstractEvent = require('./abstract');

class UpcomingLotEvent extends AbstractEvent {
    initEvent() {
        //activeLotChange
        this.subscriber.on('message', (channel, message) => {
            try {
                message = JSON.parse(message);
                if (message.command === "activeLotChange") {
                    this.processActiveLotChange(message.auction, message.content);
                }
            } catch (e) {
                this.logger.error({ service: 'Notification Service', msg: `${this.constructor.name}: Can not process message:`, data: e } );
            }
        });
        this.setupCron();
    }

    setupCron() {
        this.logger.info({ service: 'Notification Service', msg: `${this.constructor.name}:Setting up cron job to receive upcoming auction` } );
        cron.schedule('* * * * *', () => {
            this.fetchUpcomingAuctions().then((rows) => {
                if(rows.length > 0) {
                    this.logger.info({
                        service: 'Notification Service',
                        msg: `Received upcoming auctions ${rows.length}`,
                        data: rows
                    });

                    rows.forEach((auction) => {
                        this.logger.info({ service: 'Notification Service', msg: `${this.constructor.name}: Fetching upcoming lots for auction ID [${auction.auction_id}]:`});
                        this.fetchUpcomingLotsForAuction(auction, this.config.params.notify_no_lots_before).then((lots) => {
                            this.logger.info({ service: 'Notification Service', msg: `${this.constructor.name}: Fetching sending notification about ${lots.length} upcoming lots`, data: lots});

                            lots.forEach(upcoming_lot => {
                                this.notifyAboutUpcomingLot(upcoming_lot)
                            })
                        })
                    })
                }
            })
        });
    }


    async fetchUpcomingLotsForAuction(auction, limit = 0) {
        if(!this.config.firstUpcomingLotsSqlQuery) {
            this.logger.error({ service: 'Notification Service', msg: `${this.constructor.name}: getUsersToNotify:upcomingAuctionSqlQuery in not configured`});
            return [];
        }
        const sqlQuery = helper.replaceVariables(this.config.firstUpcomingLotsSqlQuery + (limit ? ` LIMIT ${limit}` : ''), { ...auction, ...this.config.params });
        const [ lots ] = await mysqlPool.query(sqlQuery);
        return lots;
    }


    async fetchUpcomingAuctions() {
        if(!this.config.upcomingAuctionSqlQuery) {
            this.logger.error({ service: 'Notification Service', msg: `${this.constructor.name}: getUsersToNotify:upcomingAuctionSqlQuery in not configured`});
            return [];
        }
        const sqlQuery = helper.replaceVariables(this.config.upcomingAuctionSqlQuery, this.config.params);
        const [ rows ] = await mysqlPool.query(sqlQuery);
        return rows;
    }

    setupConfig(config) {
        super.setupConfig(config);
        if(!this.config.params.notify_no_lots_before) {
            this.config.params.notify_no_lots_before = 5;
            this.logger.warning({ service: 'Notification Service', msg: `${this.constructor.name}: notify_no_lots_before is not set. Set to default = 5` } );
        }
        if(!this.config.params.notify_min_before_auction_starts) {
            this.config.params.notify_min_before_auction_starts = 5;
            this.logger.warning({ service: 'Notification Service', msg: `${this.constructor.name}: notify_min_before_auction_starts is not set. Set to default = 5` } );
        }
        if(!this.config.sqlQuery) {
            this.config.sqlQuery = null;
        }
    }

    async processActiveLotChange(auction_id, { lot_id, lot_number }) {
        const lots = await this.fetchUpcomingLotsForAuction({ auction_id });
        const cur_lot_index = lots.findIndex((lot) => {
            return parseInt(lot_id) === parseInt(lot.lot_id);
        });

        const lot_notification_index = cur_lot_index >= 0 ? (cur_lot_index + this.config.params.notify_no_lots_before) : false;
        if(typeof lots[lot_notification_index] != 'undefined') {
            const upcoming_lot = lots[lot_notification_index];
            this.logger.info({ service: 'Notification Service', msg: `${this.constructor.name}: in next [${this.config.params.notify_no_lots_before}] lots - upcoming Lot ID [${upcoming_lot.lot_id}]:`});
            await this.notifyAboutUpcomingLot(upcoming_lot);
        } else {
            this.logger.info({ service: 'Notification Service', msg: `${this.constructor.name}: No more upcoming lots in next [${this.config.params.notify_no_lots_before}] lots`});
        }
    }

    async notifyAboutUpcomingLot(data) {
        const users = await this.getUsersToNotify(data);
        await this.broadcastNotification(users, data)
    }
}

module.exports = UpcomingLotEvent;
