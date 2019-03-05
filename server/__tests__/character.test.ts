import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import mongoose from 'mongoose';
import { testServer } from './test_server';
import { Character } from '../api/models/character';
import { data } from '../seeders/seed';

const GET_CHARACTER = gql`
  query {
    getCharacterProfiles {
      name
      alias
      abilities
      powerLevel
      publisher
    }
  }
`;

const ADD_CHARACTER = gql`
  mutation addCharacterProfile($form: addCharacterProfile!) {
    addCharacterProfile(input: $form) {
      message
    }
  }
`;

const UPDATE_CHARACTER = gql`
  mutation updateCharacterProfile(
    $id: ID!
    $update: updateCharacterProfile
  ) {
    updateCharacterProfile(id: $id, input: $update) {
      name
      alias
    }
  }
`;

const REMOVE_CHARACTER = gql`
  mutation removeCharacterProfile($id: ID!) {
    removeCharacterProfile(id: $id) {
      message
    }
  }
`;

describe('Character', () => {
  beforeAll(async done => {
    const { readyState } = mongoose.connection;

    //Connect with Mongo if it's been disconnected
    if (readyState === 0) {
      await mongoose.connect(
        'mongodb://localhost:27017/test',
        {
          useNewUrlParser: true
        },
        error => {
          if (error) {
            throw new Error(
              `There\'s been an connection error, ${error}`
            );
          }
        }
      );
    }
    return done();
  });

  afterAll(async done => {
    const { db } = mongoose.connection;

    if (db.collection.length) {
      await db.dropDatabase(error => {
        if (error) {
          throw new Error(error.toString());
        }
      });
    }

    return done();
  });

  describe('Queries', () => {
    beforeEach(async () => {
      //Seed some data to the db
      await Character.collection.insertMany(data);
    });

    it('should display a list of existing characters', async () => {
      const { server } = await testServer();

      const { query } = createTestClient(server as any);

      const { data } = (await query({
        query: GET_CHARACTER
      })) as any;

      expect(data.getCharacterProfiles).not.toBeNull();
      expect(data.getCharacterProfiles).toHaveLength(3);
    });
  });

  describe('Mutations', () => {
    it('adds a new character to the db', async () => {
      const expected = {
        addCharacterProfile: {
          message: 'Character has been added successfully!'
        }
      };

      const { server } = await testServer();

      const { mutate } = createTestClient(server as any) as any;

      const { data } = await mutate({
        mutation: ADD_CHARACTER,
        variables: {
          form: {
            name: 'John Doe',
            alias: 'Super Doe',
            abilities: [
              'flight',
              'laser vision',
              'strength',
              'speed'
            ],
            powerLevel: 'Power House',
            publisher: 'DC',
            imageUpload: null
          }
        }
      });

      expect({ data }.data).toEqual(expected);
    });

    it('gets the added character from the db', async () => {
      const expected = {
        name: 'John Doe',
        alias: 'Super Doe',
        abilities: ['flight', 'laser vision', 'strength', 'speed'],
        powerLevel: 'Power House',
        publisher: 'DC'
      };

      const { server } = await testServer();

      const { query } = createTestClient(server as any);

      const { data } = (await query({
        query: GET_CHARACTER
      })) as any;

      expect(data.getCharacterProfiles).toContainEqual(expected);
    });

    it('should update the existing character from the db', async () => {
      const { id } = (await Character.findOne({
        name: 'John Doe'
      })) as any;

      const update = {
        name: 'Jane Doe',
        alias: 'Super Jane'
      };

      const { server } = await testServer();

      const { mutate } = createTestClient(server as any) as any;

      const { data } = await mutate({
        mutation: UPDATE_CHARACTER,
        variables: {
          id,
          update: {
            name: update.name,
            alias: update.alias
          }
        }
      });

      expect(data.updateCharacterProfile).toEqual(update);
    });

    it('should remove the existing character from the db', async () => {
      const { id } = (await Character.findOne({
        name: 'Dick Grayson'
      })) as any;

      const { server } = await testServer();

      const { mutate } = createTestClient(server as any) as any;

      const { data: { removeCharacterProfile } } = await mutate({
        mutation: REMOVE_CHARACTER,
        variables: {
          id: id
        }
      });

      //TODO: The success message needs to be replaced with the success boolean
      expect(removeCharacterProfile.message).toEqual('Character profile removed successfully');
    });
  });
});
