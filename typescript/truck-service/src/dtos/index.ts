import {Stringified} from "../types/Stringified";

type ParcelCollectionDTO = ParcelDTO[];

export type BasicDTO = {
    id: Stringified
}

export type TruckDTO = BasicDTO & {
    parcels?: ParcelCollectionDTO
    totalParcelsNo: number
    totalParcelsWeight: number
}

export type ParcelDTO = BasicDTO & {
    weight: number
}