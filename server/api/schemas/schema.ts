import { makeExecutableSchema } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { resolvers as character } from '../resolvers/character';
import { resolvers as showing } from '../resolvers/showing';

const typeDefs = importSchema('./server/api/schemas/schema.graphql');

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [character, showing]
});
