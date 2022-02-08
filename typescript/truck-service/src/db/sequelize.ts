import {Dialect, Sequelize} from 'sequelize'

const dbConfig = {
    username:   (process.env.DB_USER        || 'root') as string,
    password:   (process.env.DB_PASSWORD    || null) as string | null,
    database:   (process.env.DB_NAME        || 'truck_service_db') as string,
    host:       (process.env.DB_HOST        || 'localhost') as string,
    dialect:    (process.env.DB_DIALECT     || 'sqlite') as Dialect,
    storage:    (process.env.DB_STORAGE     || './dev.sqlite') as string
};

const sequelizeConnection = new Sequelize({
    ...dbConfig,
    logging: console.log
})

export default sequelizeConnection