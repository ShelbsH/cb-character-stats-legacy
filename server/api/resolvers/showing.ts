export const resolvers = {
  Query: {
    getShowings: async (...args) => {
      const [, , ctx] = args;
      const response = await ctx.models.showing
        .find()
        .populate('character')
        .exec();

      try {
        return response;
      } catch (error) {
        throw Error(`Unable to get showings request ${error}`);
      }
    },
    getShowingByCharacter: async (_, { id }, ctx) => {
      const response = await ctx.models.showing
        .find({
          character: id
        })
        .exec();

      try {
        return response;
      } catch (error) {
        throw Error('Unable to find character' + error);
      }
    }
  },
  Mutation: {
    addShowing: async (_, { input }, ctx) => {
      const response = new ctx.models.showing({
        ...input
      });
      try {
        response.save();
        return response;
      } catch (error) {
        throw Error(`Unable to create a showing for the character ${error}`);
      }
    }
  },
  Showing: {
    character: async ({ character }) => {
      return character;
    }
  }
};
