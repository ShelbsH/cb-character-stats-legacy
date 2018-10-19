import { getCharacterProfiles, addCharacterProfile } from './character';
import { addShowing, getShowings, Showing, getShowingByCharacter } from './showing';

export const resolvers = {
  Query: {
    getCharacterProfiles,
    getShowings,
    getShowingByCharacter
  },
  Mutation: {
    addCharacterProfile,
    addShowing
  },
  Showing
}
