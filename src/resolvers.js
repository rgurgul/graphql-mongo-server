import { Cat } from "./models/Cat";
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();
const CAT_ADDED = 'CAT_ADDED';

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
      pubsub.publish(CAT_ADDED, { catAdded: kitty });
      await kitty.save();
      return kitty;
    },
    removeCatById: async (_, { id }) => {
      const kitty = await Cat.findByIdAndRemove(id);
      return kitty;
    }
  },
  Subscription: {
    catAdded: {
      subscribe: () => pubsub.asyncIterator([CAT_ADDED])
    },
  },
};
