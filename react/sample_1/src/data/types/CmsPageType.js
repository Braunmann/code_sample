import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';


const CmsPageType = new ObjectType({
  name: 'CmsPage',
  description: "Represents cms page field types for the frontend",
  fields: {
    id: {type: IntType },
    name: { type: StringType },
    slug: { type: StringType },
    active: { type: IntType },
    lang: { type: StringType },
    region: { type: StringType },
    seoTitle: { type: StringType },
    seoDescription: { type: StringType },
    seoKeywords: { type: BooleanType },
    content: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType }
  },
});

export default CmsPageType;
