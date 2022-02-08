import {AdapterInterface} from "./AdapterInterface";
import {ParcelEntity} from "../../entities/ParcelEntity";
import {ParcelPersistence} from "../../rawPersistences";
import {TruckAdapter} from "./TruckAdapter";

export class ParcelAdapter implements AdapterInterface<ParcelEntity, ParcelPersistence> {
    public entityToPersistence (parcel) {
        return {
            id: parcel.id.stringify(),
            weight: parcel.weight.value,
            truckId: parcel.trucks ? parcel.trucks.id.stringify() : null
        }
    }

    public persistenceToEntity(parcel) {
        if(parcel?.trucks) {
            const truckAdapter = new TruckAdapter();
            parcel.trucks = truckAdapter.persistenceToEntity(parcel.trucks);
        }
        return ParcelEntity.create(parcel)
    }
}