import { WeightVO } from "../../../src/valueObjects/WeightVO";

describe('Weight Value Object Test Suite', () => {
    it('Should allow to create Weight VO using create() method', () => {
        // arrange
        const weight = WeightVO.create(1000);

        // assert
        expect(weight.value).toBe(1000);
        expect(weight).toBeInstanceOf(WeightVO);
    });

    it('Should create new WeightVO as result of addition', () => {
        // arrange
        const weightOne = WeightVO.create(1000);
        const weightTwo = WeightVO.create(500);

        // act
        const weightSum = weightOne.add(weightTwo);

        // assert
        expect(weightSum.value).toBe(1500);
        expect(weightSum).toBeInstanceOf(WeightVO);
    });

    it('Should return true if two WeightVO are equals', () => {
        // arrange
        const weightOne = WeightVO.create(1000);
        const weightTwo = WeightVO.create(1000);

        // act
        const isEqual = weightOne.equals(weightTwo);

        // assert
        expect(isEqual).toBeTruthy();
    });

    it('Should return false if two WeightVO are not equals', () => {
        // arrange
        const weightOne = WeightVO.create(1000);
        const weightTwo = WeightVO.create(500);

        // act
        const isEqual = weightOne.equals(weightTwo);

        // assert
        expect(isEqual).toBeFalsy();
    });

    it('Should stringify to JSON', () => {
        // arrange
        const weight = WeightVO.create(1000);

        // act
        const stringified = weight.stringify();

        // assert
        expect(stringified).toBe(1000);
    })
})