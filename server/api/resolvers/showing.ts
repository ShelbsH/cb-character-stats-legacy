export const addShowing = async (_, { input }, ctx) => {
  const createShowing = new ctx.models.showing({
    ...input
  });
  try {
    createShowing.save();
    return createShowing;
  } catch (error) {
    throw Error(`Unable to create a showing for the character ${error}`);
  }
};

export const getShowings = async (...args) => {
  const [, , ctx] = args;
  const showings = await ctx.models.showing
    .find()
    .populate('character')
    .exec();

  try {
    return showings;
  } catch (error) {
    throw Error(`Unable to get showings request ${error}`);
  }
};

export const getShowingByCharacter = async (_, { id }, ctx) => {
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
};

export const Showing = {
  character: async ({ character }) => {
    return character;
  }
};
