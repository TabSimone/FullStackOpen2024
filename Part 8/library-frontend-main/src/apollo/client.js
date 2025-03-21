// src/apollo/client.js

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Configurazione del client Apollo
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000', // URL del tuo server GraphQL
  }),
  cache: new InMemoryCache(), // Configurazione della cache
});

export default client;
