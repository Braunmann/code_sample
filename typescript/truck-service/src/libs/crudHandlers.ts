import {Handler} from "aws-lambda";
import {formatJSONResponse} from "@libs/apiGateway";
import {APIGatewayProxyEvent} from "aws-lambda/trigger/api-gateway-proxy";
import {middyfy} from "@libs/lambda";
import {EntityType} from "../entities/AbstractEntity";

export const crudHandlers = (crudHandlerConfig) => {
    const { repository, jsonApi, Entity, repositoryOptions, related } = crudHandlerConfig;

    const fetchAll: Handler = async () => {
        const repo = await repository();
        const items = await repo.fetchAll(repositoryOptions);
        return formatJSONResponse(jsonApi.list(items));
    }

    const findOne: Handler = async (event: APIGatewayProxyEvent) => {
        const id = event.pathParameters.id;
        const repo = await repository();

        const item = await repo.findById(id, repositoryOptions);
        return formatJSONResponse(item ? jsonApi.item(item) : null, item ? 200 : 404);
    }

    const update: Handler = async (event: APIGatewayProxyEvent) => {
        const id = event.pathParameters.id;
        const repo = await repository();
        const item = await repo.findById(id);
        if(!item) {
            return formatJSONResponse(null, 404);
        }
        item.updateProps(event.body);
        await repo.save(item);
        return formatJSONResponse(jsonApi.item(item));
    }

    const create: Handler = async (event: APIGatewayProxyEvent) => {
        const repo = await repository();
        const item = Entity.create(event.body);
        const result = await repo.save(item);
        return formatJSONResponse(result ? jsonApi.item(item) : null, result ? 200 : 500);
    }

    const remove: Handler = async (event: APIGatewayProxyEvent) => {
        const id = event.pathParameters.id;
        const repo = await repository();
        const result = await repo.delete(id);

        return formatJSONResponse(null, result ? 204 : 404);
    }

    const fetchRelationAll: Handler = async (event: APIGatewayProxyEvent) => {
        const id = event.pathParameters.id;
        const relObject = event.pathParameters.relObject;
        const repo = await repository();
        try {
            const item = await repo.findById(id, repositoryOptions);
            const relatedItems = item.getRelated(relObject);
            return formatJSONResponse(jsonApi.list(relatedItems));
        } catch (e) {
            return formatJSONResponse({errors: [e.message]}, 404);
        }
    }

    const createRelation: Handler = async (event: APIGatewayProxyEvent) => {
        const id = event.pathParameters.id;
        const relObject = event.pathParameters.relObject;
        const relId = event.body.id;

        const repo = await repository();

        try {
            const item = await repo.findById(id, repositoryOptions);
            if(!item) throw new Error(`Item ${id} doesn't exists`);

            const relatedItem = await related[relObject].findById(relId);
            if(!relatedItem) throw new Error(`Related Item ${relId} doesn't exists`);

            item.addRelation(relObject as EntityType, relatedItem);

            await repo.save(item);

            return formatJSONResponse(jsonApi.item(item));
        } catch (e) {
            return formatJSONResponse({errors: [e.message]}, 404);
        }

    }

    const removeRelation: Handler = async (event: APIGatewayProxyEvent) => {
        const id = event.pathParameters.id;
        const relObject = event.pathParameters.relObject;
        const relId = event.pathParameters.relId;

        const repo = await repository();

        try {
            const item = await repo.findById(id, repositoryOptions);
            if(!item) throw new Error(`Item ${id} doesn't exists`);

            const relatedItem = await related[relObject].findById(relId);
            if(!relatedItem) throw new Error(`Related Item ${relId} doesn't exists`);

            item.removeRelation(relObject as EntityType, relatedItem);

            await repo.save(item);

            return formatJSONResponse(jsonApi.item(item));
        } catch (e) {
            return formatJSONResponse({errors: [e.message]}, 404);
        }
    }


    return {
        fetchAllHandler: middyfy(fetchAll),
        findOneHandler: middyfy(findOne),
        updateHandler: middyfy(update),
        createHandler: middyfy(create),
        removeHandler: middyfy(remove),

        fetchAllRelationHandler: middyfy(fetchRelationAll),
        createRelationHandler: middyfy(createRelation),
        removeRelationHandler: middyfy(removeRelation)
    }
}
