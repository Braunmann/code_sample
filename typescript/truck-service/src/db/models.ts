import TruckModel from "./TruckModel";
import ParcelModel from "./ParcelModel";

TruckModel.hasMany(ParcelModel, { as: 'parcels', foreignKey: 'truckId', sourceKey: 'id', onDelete: 'SET NULL'});
ParcelModel.belongsTo(TruckModel, { as: 'trucks', foreignKey: 'truckId' });

export const trucks = TruckModel;
export const parcels = ParcelModel;