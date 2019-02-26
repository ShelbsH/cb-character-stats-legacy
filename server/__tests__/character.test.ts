import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import mongoose from 'mongoose';
import { testServer } from './test_server';

const ADD_CHARACTER = gql`
  mutation addCharacterProfile($form: addCharacterProfile!) {
    addCharacterProfile(input: $form) {
      message
    }
  }
`;

beforeAll(async (done) => {

  const { readyState } = mongoose.connection;

  //Connect with Mongo if it's been disconnected
  if (readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/test', (error) => {
      if(error) {
        throw new Error(`There\'s been an error connection, ${error}`);
      }
    });
  }
  return done();
});

afterAll(async (done) => {
  const { db } = mongoose.connection;

  if(db.collection.length) {
    await db.dropDatabase((error) => {
      if(error) {
        throw new Error(error.toString());
      }
    });
  }

  return done();
});

describe('Mutations', () => {
  it('should add a new character', async () => {
    const expected = {
      addCharacterProfile: {
        message: 'Character has been added successfully!'
      }
    };

    const { server } = await testServer();

    const { mutate } = createTestClient(server as any) as any;

    const res = await mutate({
      mutation: ADD_CHARACTER,
      variables: {
        form: {
          name: 'John Doe',
          alias: 'Super Doe',
          abilities: ['flight', 'laser vision', 'strength', 'speed'],
          powerLevel: 'Power House',
          publisher: 'DC',
          imageUpload: null
        }
      }
    });

    expect(res.data).toEqual(expected);
  });
});
