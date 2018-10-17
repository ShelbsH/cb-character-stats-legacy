import app from './app';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import  { resolvers } from './api/resolvers/resolvers';
import { Character } from './api/models/character';

const typeDefs = importSchema('./server/api/schemas/schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models: {
      character: Character
    }
  }
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

//Run the application on PORT, 3000.
app.listen(PORT, () =>
  console.log(
    `Server is running on localhost:${PORT}
    \nGraphQL is running on localhost:${PORT}/graphql`
  )
);
