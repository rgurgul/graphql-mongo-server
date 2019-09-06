import { Cat } from "./models/Cat";
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();
const POST_ADDED = 'POST_ADDED';

export const resolvers = {
  Query: {
    hello: () => "hi",
    fetch: () => Cat.find(),
    getById: (_, { id }) => Cat.findById(id),
    getByName: (_, { name }) => Cat.findOne({ name: new RegExp(name, "i") })
  },
  Mutation: {
    createCat: async (_, { name }) => {
      const kitty = new Cat({ name });
      await kitty.save();
      pubsub.publish(POST_ADDED, { postAdded: args });
      return kitty;
    },
    removeCatById: async (_, { id }) => {
      const kitty = await Cat.findByIdAndRemove(id);
      return kitty;
    }
  },
  Subscription: {
    postAdded: async (_, { id }) => {
      subscribe: () => {
        const asyncIterator = pubSub.asyncIterator([POST_ADDED]);
        console.log('itttt');
        return asyncIterator;
      }
    }
  },
};
