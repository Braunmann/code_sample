import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';


const CmsBlockType = new ObjectType({
  name: 'CmsBlock',
  description: "Represents cms block field types for the frontend",
  fields: {
    id: {type: IntType },
    name: { type: StringType },
    slug: { type: StringType },
    active: { type: IntType },
    lang: { type: StringType },
    region: { type: StringType },
    content: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType }
  },
});

export default CmsBlockType;
