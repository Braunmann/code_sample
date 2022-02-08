import {WeightVO} from "../valueObjects/WeightVO";
import {AbstractEntity, EntityType, UniqueEntityID} from "./AbstractEntity";
import {ParcelDTO} from "../dtos";
import {mapToDTO} from "../interfaces";
import {TruckEntity} from "./TruckEntity";

type ParcelEntityProps = {
    weight: WeightVO;
    trucks: TruckEntity;
}

type CreateParcelEntityProps = {
    weight: number;
    id?: string;
    trucks?: TruckEntity;
}

type UpdateParcelEntityProps = Omit<CreateParcelEntityProps, 'id'>;

export class ParcelEntity extends AbstractEntity<ParcelEntityProps> implements mapToDTO<ParcelDTO> {
    public static create(props: unknown): ParcelEntity {
        if (!this.isCreateParcelEntityProps(props)) {
            throw new Error("Missing required props");
        }
        const {weight, id, trucks} = props;
        const uniqueID = new UniqueEntityID(id);
        return new ParcelEntity({weight: WeightVO.create(weight), trucks}, uniqueID);
    }

    public get weight(): WeightVO {
        return this.props.weight;
    }

    public get trucks(): TruckEntity {
        return this.props.trucks;
    }

    public set trucks(trucks: TruckEntity | null) {
        this.props.trucks = trucks;
    }

    public static isCreateParcelEntityProps(props): props is CreateParcelEntityProps {
        return props?.weight && typeof props.weight == 'number'
    }

    public toDTO(deep = true) {
        return deep ? {
            id: this.id.stringify(),
            weight: this.weight.value,
            trucks: this.trucks ? this.trucks.toDTO(false) : null
        } : {
            id: this.id.stringify(),
            weight: this.weight.value,
        };
    }

    getType() {
        return 'parcels';
    }

    updateProps(props: Partial<UpdateParcelEntityProps>) {
        if(props?.weight) {
            this.props.weight = WeightVO.create(props?.weight)
        }
    }

    public addRelation(relObject: EntityType, entity: AbstractEntity<any>) {
        const isTruckEntity = (_entity, rel): _entity is TruckEntity => rel === 'trucks'
        if(isTruckEntity(entity, relObject)) {
            this.trucks = entity;
            return true;
        }
        throw new Error(`Relation ${relObject} is not allowed.`)
    }

    public removeRelation(relObject: EntityType, entity: AbstractEntity<any>) {
        const isTruckEntity = (_entity, rel): _entity is TruckEntity => rel === 'trucks'
        if(isTruckEntity(entity, relObject)) {
            this.trucks = null;
            return true;
        }
        throw new Error(`Relation ${relObject} is not allowed.`)
    }


}