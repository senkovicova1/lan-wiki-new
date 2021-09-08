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

  const {filterType} = match.params;

const addNew = ( title, tags, notebook, body ) => {
  NotesCollection.insert( {
    title, tags, body, notebook
  }, (error, _id) => {
    if (error){
      console.log(error);
    } else {
      history.push(getGoToLink("noteDetail", {noteID: _id, filterType: "notebooks"}));
    }
  } );
}

  const cancel = () => {
    history.goBack();
  }

  return (
    <NoteForm {...props} formTitle={"Add note"} onSubmit={addNew} onCancel={cancel} />
  );
};
