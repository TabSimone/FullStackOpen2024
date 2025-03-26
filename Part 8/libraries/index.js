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
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');

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

const pubsub = new PubSub();

// Funzione per avviare il server
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({
    schema,
    context: async (ctx) => {
      const auth = ctx.connectionParams?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return {};
      }

      try {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        if (!currentUser) {
          throw new GraphQLError('User not found', {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }
        return { currentUser, pubsub };
      } catch (error) {
        throw new GraphQLError('Authentication failed', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
    },
  }, wsServer);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

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
          if (!auth || !auth.startsWith('Bearer ')) {
            return {};
          }

          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id);
          if (!currentUser) {
            throw new GraphQLError('User not found', {
              extensions: { code: 'UNAUTHENTICATED' },
            });
          }

          return { currentUser, pubsub };
        } catch (error) {
          console.error('Error in context creation:', error.message);
          throw new GraphQLError('Authentication failed', {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }
      },
    }),
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
    console.log(`Subscriptions are running on ws://localhost:${PORT}/graphql`);
  });
};

start();
