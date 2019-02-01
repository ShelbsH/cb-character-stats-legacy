import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_CHARACTER } from 'app/queries';
import { RootView } from 'app/components/common/RootView';
import { AddProfileForm } from 'app/components/AddProfileForm';

export class AddCharacterProfile extends React.Component {
  render() {
    return (
      <RootView>
        <h1 className="head-title">Create Character Profile</h1>
        <p>
          <i>All fields are required*</i>
        </p>
        <div className="characterForm">
          {/*TODO: Add error handling when the form is submitted*/}
          <Mutation mutation={ADD_CHARACTER}>
            {addCharacterProfile => (
              <AddProfileForm
                addCharacterProfile={addCharacterProfile}
              />
            )}
          </Mutation>
        </div>
      </RootView>
    );
  }
}
