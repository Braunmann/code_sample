import sequelizeConnection from './sequelize'

const dbInit = async () => {
    await sequelizeConnection.sync(
    //    { alter: true }
    );
}
export default dbInit