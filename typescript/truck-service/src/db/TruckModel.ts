import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from './sequelize'

interface TruckModelAttributes {
    id: string;
}
export interface TruckModelCreate extends Optional<TruckModelAttributes, 'id'> {}
export interface TruckModelView extends Required<TruckModelAttributes> {}

class TruckModel extends Model<TruckModelAttributes, TruckModelCreate> implements TruckModelAttributes {
    public id!: string
}

TruckModel.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
}, {
    tableName: 'trucks',
    sequelize: sequelizeConnection,
});

export default TruckModel;