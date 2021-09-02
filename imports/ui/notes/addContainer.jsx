import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  NotesCollection
} from '/imports/api/notesCollection';

import NoteForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function AddNoteContainer( props ) {

  const {
    match,
    history,
  } = props;

  const userId = Meteor.userId();

  const {notebookID, tagID} = match.params;

/*
useEffect(() => {
  if (company){
    const userCannotEdit = company.users.find(user => user._id === userId).level > 0;
    if (userCannotEdit){
      history.push(getGoToLink());
    }
  }
  if (!company){
    history.push(getGoToLink());
  }
}, [company, userId]);*/

const addNew = ( title, tags, body ) => {
  NotesCollection.insert( {
    title, tags, body, notebook: notebookID
  }, (error, _id) => {
    if (error){
      console.log(error);
    } else {
      history.push(getGoToLink("noteDetail", {notebookID, tagID, noteID: _id}));
    }
  } );
}

  const cancel = () => {
    history.goBack();
  }

  return (
    <NoteForm {...props} formTitle={"Add note"} onSubmit={addNew} onCancel={close} />
  );
};
