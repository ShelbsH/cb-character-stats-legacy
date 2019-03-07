import { NotFoundError, UnknownError } from './errors';
import { addAvatar } from '../../utils/s3_upload';

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
            success: false,
            message:
              "There's no character that exists in the database"
          }
        });
      }
      return response;
    }
  },
  Mutation: {
    addCharacterProfile: async (
      _,
      { input, input: { imageUpload } },
      ctx
    ) => {
      //Avatar default
      let location = 'someAvatar.com';

      if (imageUpload !== null) {
        try {
          const {
            filename,
            mimetype,
            createReadStream
          } = await imageUpload;
          const stream = createReadStream(filename);

          const { Location } = await addAvatar(
            filename,
            stream,
            mimetype
          );

          location = Location;
        } catch (error) {
          throw new UnknownError({
            data: {
              success: false,
              error
            }
          });
        }
      }

      try {
        await new ctx.models.character({
          ...input,
          avatarUrl: location
        }).save();

        return {
          success: true,
          message: 'Character has been added successfully!'
        };
      } catch (error) {
        throw new UnknownError({
          data: {
            success: false,
            error
          }
        });
      }
    },
    updateCharacterProfile: async (_, { id, input }, ctx) => {
      try {
        return await ctx.models.character.findByIdAndUpdate(
          id,
          {
            $set: {
              ...input
            }
          },
          {
            new: true
          }
        );
      } catch (error) {
        throw new UnknownError({
          data: {
            success: false,
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
            success: true,
            message: 'Character profile removed successfully'
          };
        } else {
          throw new UnknownError({
            data: {
              success: false
            }
          });
        }
      } catch (error) {
        throw new UnknownError({
          data: {
            success: false,
            error
          }
        });
      }
    }
  }
};
