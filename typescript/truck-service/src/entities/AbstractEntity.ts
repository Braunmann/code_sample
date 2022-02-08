import {v4 as uuidv4, validate as uuidValidate, version as uuidVersion} from 'uuid';
import {Stringified} from "../types/Stringified";

export type EntityType = "trucks" | "parcels";

export class UniqueEntityID {
    protected readonly _uuid: string;

    constructor(uuid?: string) {
        if (!uuid) {
            this._uuid = uuidv4();
        } else if (this.uuidValidateV4(uuid)) {
            this._uuid = uuid;
        } else {
            throw new Error('Given UUID is not valid UUID v4.')
        }
    }

    get uuid(): string {
        return this._uuid;
    }

    uuidValidateV4(uuid) {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }

    stringify(): Stringified {
        return this.uuid;
    }
}

export abstract class AbstractEntity<T> {
    protected readonly _id: UniqueEntityID;
    protected props: T;

    protected constructor(props: T, id?: UniqueEntityID) {
        this._id = id ? id : new UniqueEntityID();
        this.props = props;
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    abstract updateProps(props: any)

    getRelated(relatedIndex) {
        if(this.hasOwnProperty(relatedIndex) || this[relatedIndex]) {
            return this[relatedIndex]
        }
        throw Error(`Relation ${relatedIndex} doesn't exists`)
    }

    public abstract getType()

    public abstract addRelation(relObject: EntityType, entity: AbstractEntity<any>)

    public abstract removeRelation(relObject: EntityType, entity: AbstractEntity<any>)

}

export const isEntity = (v: any): v is AbstractEntity<any> => {
    return v instanceof AbstractEntity;
};