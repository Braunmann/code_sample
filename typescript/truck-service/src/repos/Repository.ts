import {Stringified} from "../types/Stringified";
import {AdapterInterface} from "./adapters/AdapterInterface";
import {AbstractEntity} from "../entities/AbstractEntity";
import {BasicPersistence} from "../rawPersistences";

export type RepositoryOptions = {
    include?: string
}

export class Repository<T extends AbstractEntity<any>> {
    constructor (protected model: any, protected adapter: AdapterInterface<T, BasicPersistence>) {}

    protected createBaseQuery () {
        return {
            where: {},
        }
    }

    protected createByIdQuery (id) {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['id'] = id;
        return baseQuery
    }


    public async fetchAll(options: RepositoryOptions = {}): Promise<T> {
        const foundRecords = await this.model.findAll(options);
        return foundRecords.map(record => this.adapter.persistenceToEntity(record));
    }

    public async findById(id: Stringified, options: RepositoryOptions = {}): Promise<T> {
        const query = this.createByIdQuery(id);
        const foundRecord = await this.model.findOne({ ...query, ...options });
        return foundRecord ? this.adapter.persistenceToEntity(foundRecord) : null;
    }

    public async exists (id: Stringified): Promise<boolean> {
        const foundRecord = await this.findById(id);
        return !!foundRecord === true;
    }

    public async save (record: T): Promise<void> {
        const rawRecord = this.adapter.entityToPersistence(record);
        try {
            return this.model.upsert(rawRecord);
        } catch (err) {
            console.log(err);
        }
    }

    public async delete (record: T | Stringified): Promise<void> {
        const isEntity = (e) : e is T => !!e?.id;
        const id = isEntity(record) ? this.adapter.entityToPersistence(record).id : record;

        try {
            const query = this.createByIdQuery(id);
            return this.model.destroy(query);
        } catch (err) {
            console.log(err);
        }
    }
}