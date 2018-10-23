import { NotFoundError, UnknownError } from './errors';

export const resolvers = {
  Query: {
    getCharacterProfiles: async (...args) => {
      const [, , ctx] = args;
      const response = await ctx.models.character
        .find()
        .populate('showings')
        .exec();

      if (!response.length) {
        throw new NotFoundError({
          internalData: {
            message: "There's no character that exists in the database. Create some"
          }
        });
      }
      return response;
    }
  },
  Mutation: {
    addCharacterProfile: async (_, { input }, ctx) => {
      const response = await new ctx.models.character({
        ...input
      });
      try {
        let newResponse = response.save();
        return newResponse;
      } catch (error) {
        throw new UnknownError();
      }
    },
    removeCharacterProfile: async (_, { id }, ctx) => {
      const { character } = ctx.models;
      await character.findByIdAndDelete(id);

      try {
        return {
          message: 'Character profile removed successfully'
        };
      } catch (error) {
        throw new UnknownError({
          internalData: {
            error
          }
        });
      }
    }
  }
};
