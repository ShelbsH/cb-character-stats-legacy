import { getCharacterProfiles, addCharacterProfile } from './character';
import { addShowing, getShowings } from './showing';

export const resolvers = {
  Query: {
    getCharacterProfiles,
    getShowings
  },
  Mutation: {
    addCharacterProfile,
    addShowing
  },
  Character: {
    showings: (parent) => {
      return [{
        ...parent
      }];
    }
  }
}
