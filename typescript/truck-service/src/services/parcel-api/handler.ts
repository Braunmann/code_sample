import { ParcelAdapter } from "../../repos/adapters/ParcelAdapter";
import {parcels as ParcelModel, trucks as TrucksModel} from "../../db/models";
import dbInit from "../../db/init";
import {Repository} from "../../repos/Repository";
import {JsonApi} from "@libs/jsonApi";
import {crudHandlers} from "@libs/crudHandlers";
import {ParcelEntity} from "../../entities/ParcelEntity";

import {parcelSerializer} from "@libs/serializers/parcelSerializer";
import {truckSerializer} from "@libs/serializers/truckSerializer";
import {TruckAdapter} from "../../repos/adapters/TruckAdapter";

const initRepo = async () => {
  await dbInit();
  return new Repository<ParcelEntity>(ParcelModel, new ParcelAdapter());
}

const jsonApi = new JsonApi({
  trucks: truckSerializer,
  parcels: parcelSerializer
}, 'parcels');

const crudHandlerConfig = {
  repository: initRepo,
  jsonApi,
  mainEntity: ParcelEntity,
  repositoryOptions: { include: 'trucks' },
  related: {
    trucks: new Repository(TrucksModel, new TruckAdapter())
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