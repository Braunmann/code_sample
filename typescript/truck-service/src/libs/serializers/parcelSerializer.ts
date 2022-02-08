import {Serializer} from "jsonapi-serializer";

const trucksCollectionNamespace = 'trucks';
const parcelsCollectionNamespace = 'parcels';

export const parcelSerializer = new Serializer(parcelsCollectionNamespace, {
    attributes: ['weight', 'trucks'],
    transform: (record) => record.toDTO(),
    trucks: {
        ref: (_item, truck) => {
            return !!truck ? truck.id : null;
        },
        includedLinks: {
            self: (_record, current) => {
                return current ? `${trucksCollectionNamespace}/${current.id}` : null
            }
        },
    },
    dataLinks: {
        self: (item) => `${parcelsCollectionNamespace}/${item.id}`
    },
})