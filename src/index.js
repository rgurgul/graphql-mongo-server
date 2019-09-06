import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { access } from "./access";
const http = require('http');


const startServer = async () => {
  const app = express();
  app.use([access]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    subscriptions: {
      onConnect: (connectionParams, webSocket) => {
        console.log('connnnnnnnnnn');


//        throw new Error('Missing auth token!');
      },
    }
  });

  server.applyMiddleware({ app })

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);


  const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/course';

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true
  });
  const PORT=4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  })
};

startServer();
