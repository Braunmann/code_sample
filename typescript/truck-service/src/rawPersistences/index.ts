import {Stringified} from "../types/Stringified";

export type BasicPersistence = {
    id: Stringified
}

export type TruckPersistence = BasicPersistence;

export type ParcelPersistence = BasicPersistence & {
    weight: number
}