import { Cat } from "./models/Cat";

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
      return kitty;
    }
  }
};
