import {ParcelEntity} from "../../../../src/entities/ParcelEntity";
import {UniqueEntityID} from "../../../../src/entities/AbstractEntity";
import {ParcelAdapter} from "../../../../src/repos/adapters/ParcelAdapter";

describe("ParcelAdapter Tests Suite", () => {
    it('Should converts Persistence object to ParcelAdapter', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const parcelPersistence = {
            id: validUuidV4,
            weight: 1000
        }

        // act
        const parcelAdapter = new ParcelAdapter();
        const parcel = parcelAdapter.persistenceToEntity(parcelPersistence);

        // asserts
        expect(parcel).toBeInstanceOf(ParcelEntity);
        expect(parcel.id).toBeInstanceOf(UniqueEntityID);
        expect(parcel.id.stringify()).toEqual(validUuidV4);
        expect(parcel.weight.value).toEqual(1000);
    })
    it('Should converts ParcelEntity object to Persistence object', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const parcel = ParcelEntity.create({
            id: validUuidV4,
            weight: 1000
        })

        // act
        const parcelAdapter = new ParcelAdapter();
        const parcelPersistence = parcelAdapter.entityToPersistence(parcel);

        // asserts
        expect(parcelPersistence).toMatchInlineSnapshot(`
Object {
  "id": "4c2ebc47-9201-45b4-bbce-0eda81327e1f",
  "truckId": null,
  "weight": 1000,
}
`);
    })
})