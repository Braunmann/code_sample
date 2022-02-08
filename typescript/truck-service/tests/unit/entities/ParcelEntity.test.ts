import {ParcelEntity} from "../../../src/entities/ParcelEntity";
import {WeightVO} from "../../../src/valueObjects/WeightVO";
import {UniqueEntityID} from "../../../src/entities/AbstractEntity";

describe("Parcel Test Suite", () => {
    it("Should allow to create new Parcel with weight, and UniqueEntityID should be generated", () => {
        // arrange & act
        const parcel = ParcelEntity.create({weight: 1000})

        // assert
        expect(parcel.weight).toBeInstanceOf(WeightVO);
        expect(parcel.id).toBeInstanceOf(UniqueEntityID);
    });

    it("Should allow to create Parcel with given UniqueEntityID", () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';

        // act
        const parcel = ParcelEntity.create({weight: 1000, id: validUuidV4})

        // assert
        expect(parcel.id).toBeInstanceOf(UniqueEntityID);
        expect(parcel.id.stringify()).toEqual(validUuidV4);
    });

    it("Should allow to update Parcel weight", () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const parcel = ParcelEntity.create({weight: 1000, id: validUuidV4})

        // act
        parcel.updateProps({ weight: 200 })

        // assert
        expect(parcel.id).toBeInstanceOf(UniqueEntityID);
        expect(parcel.id.stringify()).toEqual(validUuidV4);
    });

    it('Should converts ParcelEntity object to DTO object', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const parcel = ParcelEntity.create({weight: 1000, id: validUuidV4})

        // act
        const parcelDTO = parcel.toDTO();

        // asserts
        expect(parcelDTO).toMatchInlineSnapshot(`
Object {
  "id": "4c2ebc47-9201-45b4-bbce-0eda81327e1f",
  "trucks": null,
  "weight": 1000,
}
`);
    })

    // it.skip("Should reproduce Parcel from DTO without UUID", () => {});
    // it.skip("Should reproduce Parcel from DTO with UUID", () => {});
})