import mongoose from 'mongoose';

export const getCharacterProfiles = async (...args) => {
  const [, , ctx] = args;
  const response = await ctx.models.character.find().exec();
  try {
    return response;
  } catch (error) {
    throw Error(`Error on the getting character profiles: ${error}`);
  }
};

export const addCharacterProfile = async (_, { input }, ctx) => {
  const response = await new ctx.models.character({
    _id: new mongoose.Types.ObjectId(),
    ...input
  });
  try {
    response.save();
    return response;
  } catch (error) {
    throw Error(`Unable to add character profile. Error: ${error}`);
  }
};
