import { makeExecutableSchema, gql } from 'apollo-server-express';
import { resolvers as character } from '../resolvers/character';
import { resolvers as showing } from '../resolvers/showing';
import fs from 'fs';

const mergeGqlFiles = files => {
  return files.map(file =>
    gql`${fs.readFileSync(__dirname.concat(file), 'utf8')}`
  )
};

const typeDefs = mergeGqlFiles(['/character.graphql', '/showing.graphql']);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [character, showing]
});
