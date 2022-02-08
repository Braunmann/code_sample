import {TruckEntity} from "../../../../src/entities/TruckEntity";
import {ParcelEntity} from "../../../../src/entities/ParcelEntity";
import {TruckAdapter} from "../../../../src/repos/adapters/TruckAdapter";
import {UniqueEntityID} from "../../../../src/entities/AbstractEntity";

describe("TruckAdapter Tests Suite", () => {
    it('Should converts Persistence object to TruckEntity', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const truckPersistence = {
            id: validUuidV4
        }

        // act
        const truckAdapter = new TruckAdapter();
        const truck = truckAdapter.persistenceToEntity(truckPersistence);

        // asserts
        expect(truck).toBeInstanceOf(TruckEntity);
        expect(truck.id).toBeInstanceOf(UniqueEntityID);
        expect(truck.id.stringify()).toEqual(validUuidV4);
    })
    it('Should converts TruckEntity object to Persistence object', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const truck = TruckEntity.create({
            id: validUuidV4,
            parcels: [
                ParcelEntity.create({ weight: 1000, id: "cf40fb2c-d02a-4587-a21f-6ecbcc50d632" }),
                ParcelEntity.create({ weight: 500, id: "6ce2cc03-4fad-4c50-b32b-2b74a585062d" }),
            ]
        })

        // act
        const truckAdapter = new TruckAdapter();
        const truckPersistence = truckAdapter.entityToPersistence(truck);

        // asserts
        expect(truckPersistence).toMatchInlineSnapshot(`
Object {
  "id": "4c2ebc47-9201-45b4-bbce-0eda81327e1f",
  "parcels": Array [
    Object {
      "id": "cf40fb2c-d02a-4587-a21f-6ecbcc50d632",
      "truckId": "4c2ebc47-9201-45b4-bbce-0eda81327e1f",
      "weight": 1000,
    },
    Object {
      "id": "6ce2cc03-4fad-4c50-b32b-2b74a585062d",
      "truckId": "4c2ebc47-9201-45b4-bbce-0eda81327e1f",
      "weight": 500,
    },
  ],
}
`);
    })
})