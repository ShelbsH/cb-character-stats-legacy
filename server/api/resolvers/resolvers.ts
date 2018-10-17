import { getCharacterProfiles, addCharacterProfile } from './character';
import { combineResolvers } from 'graphql-resolvers';

export const resolvers = {
  Query: {
    getCharacterProfiles
  },
  Mutation: {
    addCharacterProfile
  }
}
