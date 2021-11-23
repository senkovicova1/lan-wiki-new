import React from 'react';
import {
  useTracker
} from 'meteor/react-meteor-data';
import { useSelector } from 'react-redux';

import UserForm from './userForm';
import CurrentUserForm from './currentUserForm';

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function EditUserContainer( props ) {

  const {
    history,
    userID,
    closeSelf
  } = props;

  const userId = Meteor.userId();
  const user = useSelector((state) => state.users.value).find(u => u._id === (userID ? userID : userId));

  const editUser = ( name, surname, avatar, active, rights ) => {
    let data = {name, surname, avatar, active, rights};

    Meteor.users.update((userID ? userID : userId), {
      $set: {
        profile: data
      }
    });
    if (closeSelf){
      closeSelf();
    } else {
      history.push(getGoToLink(""));
    }
  };

  const onCancel = () => {
    if (closeSelf){
      closeSelf();
    } else {
      history.push(getGoToLink(""));
    }
  }

  if (!userID){
    return (
      <CurrentUserForm title={"Edit useasdfr"} user={user} onSubmit={editUser} onCancel={onCancel}/>
      )
  }

  return (
        <UserForm title={"Edit user"} user={user} onSubmit={editUser} onCancel={onCancel}/>
  );
};
