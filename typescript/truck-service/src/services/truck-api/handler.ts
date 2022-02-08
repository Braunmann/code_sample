import { TruckAdapter } from "../../repos/adapters/TruckAdapter";
import {trucks as TrucksModel, parcels as ParcelsModel} from "../../db/models";
import dbInit from "../../db/init";
import {Repository} from "../../repos/Repository";
import {JsonApi} from "@libs/jsonApi";
import {truckSerializer} from "@libs/serializers/truckSerializer";
import {crudHandlers} from "@libs/crudHandlers";
import {TruckEntity} from "../../entities/TruckEntity";
import {parcelSerializer} from "@libs/serializers/parcelSerializer";
import {ParcelAdapter} from "../../repos/adapters/ParcelAdapter";

const initRepo = async () => {
  await dbInit();
  return new Repository(TrucksModel, new TruckAdapter());
}

const jsonApi = new JsonApi({
  trucks: truckSerializer,
  parcels: parcelSerializer
}, 'trucks');

const crudHandlerConfig = {
  repository: initRepo,
  jsonApi,
  mainEntity: TruckEntity,
  repositoryOptions: { include: 'parcels' },
  related: {
    parcels: new Repository(ParcelsModel, new ParcelAdapter())
  }
}

const handlers = crudHandlers(crudHandlerConfig);

export const fetchAllHandler = handlers.fetchAllHandler;
export const findOneHandler = handlers.findOneHandler;
export const updateHandler = handlers.updateHandler;
export const createHandler = handlers.createHandler;
export const removeHandler = handlers.removeHandler;

export const fetchAllRelationHandler = handlers.fetchAllRelationHandler
export const createRelationHandler = handlers.createRelationHandler
export const removeRelationHandler = handlers.removeRelationHandler