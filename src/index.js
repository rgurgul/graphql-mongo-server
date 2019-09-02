import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { access } from "./access";

const startServer = async () => {
  const app = express();
  app.use([access]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true, function
  });

  server.applyMiddleware({ app });

  const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/course';

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
