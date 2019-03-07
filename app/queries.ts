import { gql } from 'apollo-boost';

export const ADD_CHARACTER = gql`
  mutation addCharacterProfile($form: addCharacterProfile!) {
    addCharacterProfile(input: $form) {
      success
      message
    }
  }
`;
