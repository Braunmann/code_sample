import {TruckEntity} from "../../../src/entities/TruckEntity";
import {UniqueEntityID} from "../../../src/entities/AbstractEntity";
import {ParcelEntity} from "../../../src/entities/ParcelEntity";
import {WeightVO} from "../../../src/valueObjects/WeightVO";

describe("Truck Tests Suite", () => {
    it("Should allow to create a new empty truck and generate ID", () => {
        // arrange
        const truck = TruckEntity.create();

        expect(truck.id).toBeInstanceOf(UniqueEntityID);
    });

    it("Should allow to create a new truck with parcels", () => {
        // arrange
        const parcels = [
            ParcelEntity.create({weight: 1000}),
            ParcelEntity.create({weight: 100}),
            ParcelEntity.create({weight: 500})
        ]

        // act
        const truck = TruckEntity.create({parcels});

        // assert
        expect(truck.parcels).toEqual(
            expect.arrayContaining([expect.any(ParcelEntity)])
        );
        expect(truck.parcels.length).toBe(3);
    });


    it("Should not pass parcels by references", () => {
        // arrange
        const parcels = [
            ParcelEntity.create({weight: 1000}),
            ParcelEntity.create({weight: 100}),
            ParcelEntity.create({weight: 500})
        ]

        // act
        const truck = TruckEntity.create({parcels});
        parcels.pop()

        // assert
        expect(truck.parcels.length).toBe(3);
    });

    it("Should returns number of loaded parcels", () => {
        // arrange
        const parcels = [
            ParcelEntity.create({weight: 1000}),
            ParcelEntity.create({weight: 100}),
            ParcelEntity.create({weight: 500})
        ]

        // act
        const truck = TruckEntity.create({parcels});

        // assert
        expect(truck.totalParcelsNo()).toBe(3);
    });

    it("Should returns total weight of loaded parcels", () => {
        // arrange
        const totalWeight = WeightVO.create(1600);
        const parcels = [
            ParcelEntity.create({weight: 1000}),
            ParcelEntity.create({weight: 100}),
            ParcelEntity.create({weight: 500})
        ]

        // act
        const truck = TruckEntity.create({parcels});

        // assert
        expect(truck.totalParcelsWeight()).toStrictEqual(totalWeight);
    });

    it("Should allow to add a parcel to truck", () => {
        // arrange
        const truck = TruckEntity.create();
        const parcel = ParcelEntity.create({weight: 1000});

        // act
        truck.addParcel(parcel);

        // assert
        expect(truck.totalParcelsNo()).toBe(1);
    });

    it("Should throw an Error during addition if parcel is already added", () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const truck = TruckEntity.create();
        const parcel = ParcelEntity.create({weight: 1000, id: validUuidV4});

        // act
        truck.addParcel(parcel);

        // assert
        expect(() => {
            truck.addParcel(parcel);
        }).toThrowError(`Can not add already added parcel: "${validUuidV4}"`);
    });

    it("Should allow to remove parcel from truck", () => {
        // arrange
        const parcels = [
            ParcelEntity.create({weight: 1000}),
            ParcelEntity.create({weight: 100}),
            ParcelEntity.create({weight: 500})
        ]

        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const truck = TruckEntity.create({parcels});
        const parcel = ParcelEntity.create({weight: 1000, id: validUuidV4});
        truck.addParcel(parcel);

        // act
        truck.removeParcel(parcel);

        // assert
        expect(truck.totalParcelsNo()).toBe(3);
        expect(truck.parcels.indexOf(parcel)).toBe(-1);
    });

    it("Should throw an Error if parcel during remove if parcel do not exists", () => {
        // arrange
        const parcels = [
            ParcelEntity.create({weight: 1000}),
        ]

        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const truck = TruckEntity.create({parcels});
        const parcel = ParcelEntity.create({weight: 1000, id: validUuidV4});

        // act & assert
        expect(() => {
            truck.removeParcel(parcel);
        }).toThrowError(`Can not remove not existing parcel: "${validUuidV4}"`)
    })

    it('Should converts ParcelEntity object to DTO object', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const truck = TruckEntity.create({
            id: validUuidV4,
            parcels: [
                ParcelEntity.create({ weight: 1000, id: "cf40fb2c-d02a-4587-a21f-6ecbcc50d632" }),
                ParcelEntity.create({ weight: 500, id: "6ce2cc03-4fad-4c50-b32b-2b74a585062d" }),
            ]}
        )

        // act
        const truckDTO = truck.toDTO();

        // asserts
        expect(truckDTO).toMatchInlineSnapshot(`
Object {
  "id": "4c2ebc47-9201-45b4-bbce-0eda81327e1f",
  "parcels": Array [
    Object {
      "id": "cf40fb2c-d02a-4587-a21f-6ecbcc50d632",
      "weight": 1000,
    },
    Object {
      "id": "6ce2cc03-4fad-4c50-b32b-2b74a585062d",
      "weight": 500,
    },
  ],
  "totalParcelsNo": 2,
  "totalParcelsWeight": 1500,
}
`);
    })
})