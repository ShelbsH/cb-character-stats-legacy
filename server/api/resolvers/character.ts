export const getCharacterProfiles = async (...args) => {
  const [, , ctx] = args;
  try {
    const allCharacters = await ctx.models.character.find().exec();

    return allCharacters;
  } catch (error) {
    throw Error(`Error on the getting character profiles: ${error}`);
  }
};

export const addCharacterProfile = async (_, { input }, ctx) => {
  try {
    const newCharacterProfile = await new ctx.models.character({
      ...input
    }).save();

    return newCharacterProfile;
  } catch (error) {
    throw Error(`Unable to add character profile. Error: ${error}`);
  }
};
