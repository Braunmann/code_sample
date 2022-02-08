import {AdapterInterface} from "./AdapterInterface";
import {TruckEntity} from "../../entities/TruckEntity";
import {TruckPersistence} from "../../rawPersistences";
import {ParcelAdapter} from "./ParcelAdapter";

export class TruckAdapter implements AdapterInterface<TruckEntity, TruckPersistence> {
    public entityToPersistence (truck) {
        const parcelAdapter = new ParcelAdapter();
        return {
            id: truck.id.stringify(),
            parcels: truck.parcels.map((p) => parcelAdapter.entityToPersistence(p))
        }
    }

    public persistenceToEntity(truck) {
        if(truck?.parcels) {
            const parcelAdapter = new ParcelAdapter();
            truck.parcels = truck.parcels.map((p) => parcelAdapter.persistenceToEntity(p));
        }
        return TruckEntity.create(truck);
    }
}