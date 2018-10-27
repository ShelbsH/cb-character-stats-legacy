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
          data: {
            message: "There's no character that exists in the database. Create some"
          }
        });
      }
      return response;
    }
  },
  Mutation: {
    addCharacterProfile: async (_, { input }, ctx) => {
      try {
        return await new ctx.models.character({
          ...input
        }).save();
      } catch (error) {
        throw new UnknownError({
          data: {
            error
          }
        });
      }
    },
    removeCharacterProfile: async (_, { id }, ctx) => {
      const { character, showing } = ctx.models;
      const response = await character.findByIdAndDelete(id);

      try {
        if (response) {
          //Remove all character profile reference objectId
          await showing.deleteMany({
            character: id
          });
          return {
            message: 'Character profile removed successfully'
          };
        } else {
          throw new UnknownError({
            data: {
              message:
                'Server Error: Unable to remove the character\'s profile'
            }
          });
        }
      } catch (error) {
        throw new UnknownError({
          data: {
            error
          }
        });
      }
    }
  }
};
