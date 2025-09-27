import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = "https://rickandmortyapi.com/graphql";

/* Initialize an AppoloClient instance - fetch GraphQL data */
const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }), 
  cache: new InMemoryCache(),   // Cache query result after fetching 
});

export default client;