import app from './app';
import { ApolloServer } from 'apollo-server-express';
import { Character } from './api/models/character';
import { Showing } from './api/models/showing';
import { schema } from './api/schemas/schema';

const server = new ApolloServer({
  schema,
  context: {
    models: {
      character: Character,
      showing: Showing
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
