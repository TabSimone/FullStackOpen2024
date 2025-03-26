const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v4: uuidv4 } = require('uuid');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const http = require('http');

// Importa le definizioni del tipo e i resolver
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Configurazione di Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Connecting to MongoDB:', MONGODB_URI);

const User = require('./models/user');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Funzione per avviare il server
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Crea un'istanza di ApolloServer
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    introspection: true, // Abilita l'introspezione
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Middleware Express per gestire le richieste GraphQL
  app.use(
    '/',
    cors({
      origin: '*',
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        try {
          const auth = req ? req.headers.authorization : null;

          // Se non c'è un token, restituisci un contesto vuoto
          if (!auth || !auth.startsWith('Bearer ')) {
            return {};
          }

          // Verifica il token JWT
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

          // Recupera l'utente corrente dal database
          const currentUser = await User.findById(decodedToken.id);
          if (!currentUser) {
            throw new GraphQLError('User not found', {
              extensions: { code: 'UNAUTHENTICATED' },
            });
          }

          return { currentUser };
        } catch (error) {
          console.error('Error in context creation:', error.message);
          throw new GraphQLError('Authentication failed', {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }
      },
    }),
  );

  // Avvia il server HTTP
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
};

start();