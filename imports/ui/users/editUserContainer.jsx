import React from 'react';

import {
  useTracker
} from 'meteor/react-meteor-data';

import UserForm from './userForm';

import {
  getLink
} from "/imports/other/navigationLinks";

export default function EditUserContainer( props ) {

  const {
    history,
  } = props;

  const user = useTracker( () => Meteor.user() );

  const editUser = ( name, surname, avatar ) => {
    let data = {...user.profile, name, surname, avatar};

    Meteor.users.update(user._id, {
      $set: {
        profile: data
      }
    });
    history.push(getLink("", {} ));
  };

  const onCancel = () => {
    history.push(getLink("", {} ));
  }

  return (
        <UserForm {...user} onSubmit={editUser} onCancel={onCancel}/>
  );
};