import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from './sequelize'

interface ParcelModelAttributes {
    id: string;
    weight: number;
    truckId: string;
}
export interface ParcelModelCreate extends Optional<ParcelModelAttributes, 'id' | 'truckId'> {}
export interface ParcelModelView extends Required<ParcelModelAttributes> {}

class ParcelModel extends Model<ParcelModelAttributes, ParcelModelCreate> implements ParcelModelAttributes {
    public id!: string
    public weight!: number
    public truckId: string
};

ParcelModel.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    truckId: {
        allowNull: true,
        type: DataTypes.UUIDV4,
    },
}, {
    tableName: 'parcels',
    sequelize: sequelizeConnection,
});


export default ParcelModel;