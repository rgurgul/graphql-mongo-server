import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    fetch: [Cat!]!
    getById(id: String!): Cat!
    getByName(name: String!): Cat!
  }

  type Cat {
    id: ID!
    name: String!
  }

  type Mutation {
    createCat(name: String!): Cat!
  }
`;
