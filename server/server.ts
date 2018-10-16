import app from './app';
import { ApolloServer } from 'apollo-server-express';

const typeDefs = `
  type Query {
    greet: String
  }
`

/**
 * TODO: Create a separate file for the schemas and import them
 * here
 */

const resolvers = {
  Query: {
    greet: (_, args, context, info) => 'Hello World'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

//Run the application on PORT, 3000.
app.listen(PORT, () =>
  console.log(
    `Server is running on localhost:${PORT} \nGraphQL is running on localhost:${PORT}/graphql`
  )
);
