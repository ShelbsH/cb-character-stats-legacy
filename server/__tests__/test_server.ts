import { ApolloServer } from 'apollo-server-express';
import { schema } from '../api/schemas/schema';
import { Character } from '../api/models/character';
import { Showing } from '../api/models/showing';

export const testServer = async () => {
  const server = await new ApolloServer({
    schema,
    context: {
      models: {
        character: Character,
        showing: Showing
      }
    }
  });

  return {
    server
  };
};
