import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';  // Importa ApolloProvider
import App from './App';
import client from './apollo/client';  // Importa il client Apollo

// Avvolgi la tua applicazione con ApolloProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>  {/* Fornisce il client Apollo a tutta l'app */}
    <App />
  </ApolloProvider>
);
