import 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const apolloCache = new InMemoryCache();


const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:3001/graphql',
    credentials: 'include',
  }),
  cache: apolloCache,
  queryDeduplication: true,
});

export default function createApolloClient() {
  return client;
}
