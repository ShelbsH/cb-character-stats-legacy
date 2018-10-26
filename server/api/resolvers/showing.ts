import { NotFoundError, UnknownError } from './errors';

export const resolvers = {
  Query: {
    getShowings: async (...args) => {
      const [, , ctx] = args;
      const response = await ctx.models.showing
        .find()
        .populate('character')
        .exec();

      if (!response.length) {
        throw new NotFoundError({
          internalData: {
            message: "There's no showings that exists in the database"
          }
        });
      }
      return response;
    },
    getShowingByCharacter: async (_, { id }, ctx) => {
      const response = await ctx.models.showing
        .find({
          character: id
        })
        .exec();

      if (!response.length) {
        throw new NotFoundError();
      }

      return response;
    }
  },
  Mutation: {
    addShowing: async (_, { input }, ctx) => {
      const objectIdExists = await ctx.models.character.findById(input.character);

      try {
        if (objectIdExists) {
          let response = await new ctx.models.showing({
            ...input
          }).save();

          return response;
        }
      } catch (error) {
        throw new UnknownError({
          internalData: {
            error
          }
        });
      }
    },
    removeShowing: async (_, { id }, ctx) => {
      const { showing } = ctx.models;
      await showing.findByIdAndDelete(id);

      try {
        return {
          message: 'Showing for this character has been removed'
        };
      } catch (error) {
        throw new UnknownError({
          internalData: {
            error
          }
        });
      }
    }
  },
  Showing: {
    character: async ({ character }) => {
      return character;
    }
  }
};