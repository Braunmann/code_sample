import { Repository } from "../../../src/repos/Repository";
import {AbstractEntity, UniqueEntityID} from "../../../src/entities/AbstractEntity";
import {Stringified} from "../../../src/types/Stringified";
import {AdapterInterface} from "../../../src/repos/adapters/AdapterInterface";

const dummyModelInstanceMock = {
    findOne: jest.fn((query) => {
        return (query?.where?.id != 'non-existing-id') ? {
            id: query.where.id,
            name: 'test name'
        } : undefined;
    }),
    upsert: jest.fn(),
    destroy: jest.fn(),
};

beforeEach(() => {
    dummyModelInstanceMock.findOne.mockClear();
    dummyModelInstanceMock.upsert.mockClear();
    dummyModelInstanceMock.destroy.mockClear();
});


type DummyProps = {
    name: string;
}

type CreateDummyProps = {
    name: string;
    id?: string;
}

type UpdateDummyProps = Omit<CreateDummyProps, 'id'>

// interface DummyDTO {
//     id?: Stringified;
//     name: string;
// }

export interface DummyPersistence {
    id: Stringified
    name: string;
}

export class DummyAdapter implements AdapterInterface<DummyEntity, DummyPersistence> {
    public entityToPersistence (dummy) {
        return {
            id: dummy.id.stringify(),
            name: dummy.name
        }
    }

    public persistenceToEntity(dummy) {
        return DummyEntity.create(dummy)
    }
}


class DummyEntity extends AbstractEntity<DummyProps> {
    public static create({ id, name }: CreateDummyProps): DummyEntity {
        const uniqueID = new UniqueEntityID(id);
        return new DummyEntity({name}, uniqueID);
    }

    get name(): string {
        return this.props.name;
    }

    public toDTO () {
        return {
            id: this.id.stringify(),
            name: this.name
        }
    }

    updateProps(props: Partial<UpdateDummyProps>) {
        if(props?.name) {
            this.props.name = props.name
        }
    }
}

describe('AbstractRepo Test Suite', () => {
    it("Should update entity record if ID is given", async () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const rawParams = { name: 'Test name', id: validUuidV4};
        const dummyRepo = new Repository(dummyModelInstanceMock, new DummyAdapter);
        const dummyEntity = DummyEntity.create(rawParams);

        // act
        await dummyRepo.save(dummyEntity)

        // assert
        expect(dummyModelInstanceMock.upsert).toBeCalledTimes(1);
        expect(dummyModelInstanceMock.upsert).toBeCalledWith(rawParams);
    })

    it("Should create entity record if ID is not given", async () => {
        // arrange
        const rawParams = { name: 'Test name'};
        const dummyRepo = new Repository(dummyModelInstanceMock, new DummyAdapter);
        const dummyEntity = DummyEntity.create(rawParams);
        const generatedId =  dummyEntity.id.stringify();

        // act
        await dummyRepo.save(dummyEntity)

        // assert
        expect(dummyModelInstanceMock.upsert).toBeCalledTimes(1);
        expect(dummyModelInstanceMock.upsert).toBeCalledWith({...rawParams, id: generatedId});
    })

    it("Should return DummyEntity for existing id", async () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const dummyRepo = new Repository(dummyModelInstanceMock, new DummyAdapter);

        // act
        const foundEntity = await dummyRepo.findById(validUuidV4);

        // assert
        expect(dummyModelInstanceMock.findOne).toBeCalledTimes(1);
        expect(dummyModelInstanceMock.findOne).toBeCalledWith({ where: { id: validUuidV4 } });
        expect(foundEntity).toBeInstanceOf(DummyEntity);
        expect(foundEntity.id.stringify()).toEqual(validUuidV4);
        expect(foundEntity.name).toEqual('test name');
    })

    it("Should return null for NON existing id", async () => {
        // arrange
        const nonExistingId = 'non-existing-id';
        const dummyRepo = new Repository(dummyModelInstanceMock, new DummyAdapter);

        // act
        const foundEntity = await dummyRepo.findById(nonExistingId);

        // assert
        expect(dummyModelInstanceMock.findOne).toBeCalledTimes(1);
        expect(dummyModelInstanceMock.findOne).toBeCalledWith({ where: { id: nonExistingId } });
        expect(foundEntity).toBeNull();
    })

    it("Should delete record for given id", async () => {
        // arrange
        const someId = 'some-id';
        const dummyRepo = new Repository(dummyModelInstanceMock, new DummyAdapter);

        // act
        await dummyRepo.delete(someId);

        // assert
        expect(dummyModelInstanceMock.destroy).toBeCalledTimes(1);
        expect(dummyModelInstanceMock.destroy).toBeCalledWith({ where: { id: someId } });
    })

    it("Should delete record for given entity", async () => {
        // arrange
        const validUuidV4 = '4c2ebc47-9201-45b4-bbce-0eda81327e1f';
        const rawParams = { name: 'Test name', id: validUuidV4};
        const dummyRepo = new Repository(dummyModelInstanceMock, new DummyAdapter);
        const dummyEntity = DummyEntity.create(rawParams);

        // act
        await dummyRepo.delete(dummyEntity);

        // assert
        expect(dummyModelInstanceMock.destroy).toBeCalledTimes(1);
        expect(dummyModelInstanceMock.destroy).toBeCalledWith({ where: { id: validUuidV4 } });
    })
})