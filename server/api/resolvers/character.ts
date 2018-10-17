export const getCharacterProfiles = async (...args) => {
  const [, , ctx] = args;
  try {
    await ctx.models.character.find({});
  } catch (error) {
    throw Error(`Internal error: ${error}`);
  }
};

export const addCharacterProfile = async (_, { input }, ctx) => {
  try {
    await new ctx.models.character({
      ...input
    });
  }
  catch(err) {
    throw Error('Unable to add character profile');
  }
}
