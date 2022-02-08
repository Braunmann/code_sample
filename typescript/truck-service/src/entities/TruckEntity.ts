import {ParcelEntity} from "./ParcelEntity";
import {AbstractEntity, EntityType, UniqueEntityID} from "./AbstractEntity";
import {WeightVO} from "../valueObjects/WeightVO";
import {Stringified} from "../types/Stringified";

type TruckProps = {
    parcels: Map<Stringified, ParcelEntity>;
}

type CreateTruckProps = {
    id?: string;
    parcels?: ParcelEntity[];
}

type UpdateTruckProps = Omit<CreateTruckProps, 'id'>;

export class TruckEntity extends AbstractEntity<TruckProps> {
    public static create(props?: CreateTruckProps): TruckEntity {
        const parcels = new Map<Stringified, ParcelEntity>();
        const id = props?.id ?? undefined;
        const uniqueID = new UniqueEntityID(id);

        const truck = new TruckEntity({parcels}, uniqueID);

        if (props?.parcels) {
            props.parcels.map(p => truck.addParcel(p))
        }
        return truck;
    }

    public get parcels(): ParcelEntity[] {
        // Converts Map to array
        return [...this.props.parcels.values()];
    }

    public addParcel(parcel: ParcelEntity) {
        const id = this._parcelId(parcel);
        if (!this.canAddParcel(parcel)) {
            throw new Error(`Can not add already added parcel: "${id}"`)
        }
        parcel.trucks = this;
        this.props.parcels.set(id, parcel);
    }

    public canAddParcel(parcel: ParcelEntity): boolean {
        return !this.hasParcel(parcel);
    }

    public removeParcel(parcel: ParcelEntity) {
        const id = this._parcelId(parcel);
        if (!this.canRemoveParcel(parcel)) {
            throw new Error(`Can not remove not existing parcel: "${id}"`)
        }
        this.props.parcels.delete(id);
    }

    public canRemoveParcel(parcel: ParcelEntity): boolean {
        return this.hasParcel(parcel);
    }

    public hasParcel(parcel: ParcelEntity): boolean {
        return this.props.parcels.has(this._parcelId(parcel));
    }

    protected _parcelId(parcel): Stringified {
        return parcel.id.stringify()
    }

    public totalParcelsWeight() {
        return this.parcels.reduce((cv, p) => cv.add(p.weight), WeightVO.create(0));
    }

    public totalParcelsNo() {
        return this.props.parcels.size;
    }

    public toDTO (deep = true) {
        return deep ? {
            id: this.id.stringify(),
            parcels: this.parcels.map((p) => p.toDTO(false)),
            totalParcelsNo: this.totalParcelsNo(),
            totalParcelsWeight: this.totalParcelsWeight().value
        } : {
            id: this.id.stringify(),
        }
    }

    getType() {
        return 'trucks';
    }

    updateProps(props: Partial<UpdateTruckProps>) {
        if(props?.parcels) {
            props.parcels.map(p => this.addParcel(p))
        }
    }

    public addRelation(relObject: EntityType, entity: AbstractEntity<any>) {
        const isParcelEntity = (_entity, rel): _entity is ParcelEntity => rel === 'parcels'
        if(isParcelEntity(entity, relObject)) {
            this.addParcel(entity);
            return true;
        }
        throw new Error(`Relation ${relObject} is not allowed.`)
    }

    public removeRelation(relObject: EntityType, entity: AbstractEntity<any>) {
        const isParcelEntity = (_entity, rel): _entity is ParcelEntity => rel === 'parcels'
        if(isParcelEntity(entity, relObject)) {
            this.removeParcel(entity);
            return true;
        }
        throw new Error(`Relation ${relObject} is not allowed.`)
    }
}