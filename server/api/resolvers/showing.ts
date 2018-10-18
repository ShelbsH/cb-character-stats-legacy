export const addShowing = async (_, { input }, ctx) => {
  const createShowing = new ctx.models.showing({
    ...input
  });
  console.log(createShowing);
  try {
    createShowing.save();
    return createShowing;
  } catch (error) {
    throw Error(`Unable to create a showing for the character ${error}`);
  }
};

export const getShowings = async (...args) => {
  const [, , ctx] = args;
  try {
    return await ctx.models.showing.find().populate('Character').exec();
  } catch (error) {
    throw Error(`Unable to get showings request ${error}`);
  }
};
