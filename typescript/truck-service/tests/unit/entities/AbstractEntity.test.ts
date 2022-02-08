import { UniqueEntityID } from "../../../src/entities/AbstractEntity";
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

describe('UniqueEntityID Test Suite', () => {
    it("Should throw an error when given UUID is not valid", () => {
        // arrange
        const invalidUuid = 'XXX-AAA';

        // act and assert
        expect(() => {
            new UniqueEntityID(invalidUuid);
        }).toThrow('Given UUID is not valid UUID v4.')
    });

    it('Should generate new UUID when it is not given', () => {
        // arrange
        const entityID = new UniqueEntityID();

        // act
        const uuid = entityID.uuid;

        // assert
        expect(uuidValidate(uuid)).toBeTruthy();
        expect(uuidVersion(uuid)).toBe(4);
    })

    it('Should allow to assign valid UUID v4', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const entityID = new UniqueEntityID(validUuidV4);

        // act
        const uuid = entityID.uuid;

        // assert
        expect(uuid).toEqual(validUuidV4);
    })

    it('Should stringify to text equals UUID value', () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const entityID = new UniqueEntityID(validUuidV4);
        const stringified = entityID.stringify();
        expect(stringified).toEqual(validUuidV4);
    })
})