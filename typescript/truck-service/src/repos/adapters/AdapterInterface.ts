export interface AdapterInterface<Entity, Persistence> {
    entityToPersistence(e: Entity) : Persistence
    persistenceToEntity(e: Persistence) : Entity
}
