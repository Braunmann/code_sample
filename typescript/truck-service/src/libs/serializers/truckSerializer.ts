import {Serializer} from "jsonapi-serializer";

const trucksCollectionNamespace = 'trucks';
const parcelsCollectionNamespace = 'parcels';

export const truckSerializer = new Serializer(trucksCollectionNamespace, {
    attributes: ['parcels'],
    transform: (record) => record.toDTO(),
    parcels: {
        ref: function (_item, parcel) {
            return parcel.id;
        },
        attributes: ['weight'],
        includedLinks: {
            self: (_record, current) => {
                return `${parcelsCollectionNamespace}/${current.id}`
            }
        },
        relationshipLinks: {
            related: (record) => {
                return `${trucksCollectionNamespace}/${record.id}/relationships/${parcelsCollectionNamespace}`
            }
        },
        relationshipMeta: {
            count: (item) => item.totalParcelsNo,
            totalWeight: (item) => item.totalParcelsWeight,
        }
    },
    dataLinks: {
        self: (item) => `${trucksCollectionNamespace}/${item.id}`
    },
})