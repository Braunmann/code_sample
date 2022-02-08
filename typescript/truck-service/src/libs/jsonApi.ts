import {AbstractEntity, EntityType} from "../entities/AbstractEntity";

type Serializers = { [type in EntityType]: any };

export class JsonApi {
    constructor(protected serializers: Serializers, protected defaultSerializer: EntityType) {

    }

    protected detectSerializer(i: AbstractEntity<any> | AbstractEntity<any>[]) {
        if(Array.isArray(i)) {
            if(i.length > 0) {
                return this.serializers[i[0].getType()];
            }
        } else if(typeof i === 'object') {
            return this.serializers[i.getType()];
        }
        return this.serializers[this.defaultSerializer];
    }

    list(items) {
        return this.detectSerializer(items).serialize(items);
    }

    item(item) {
        return this.detectSerializer(item).serialize(item);
    }
}
