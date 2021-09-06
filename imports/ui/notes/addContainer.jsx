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

  console.log("HEY");

  const {notebookID, tagID} = match.params;
  const notebooks = useSelector((state) => state.notebooks.value);
  const notebook = useMemo(() => {
    return  notebooks.find(notebook => notebook._id === notebookID);
  }, [notebooks, notebookID]);

useEffect(() => {
  if (notebook){
    const userCanAddNotes = notebook.users.find(user => user._id === userId).editItems;
    if (!userCanAddNotes){
      history.push(getGoToLink("notesList", {notebookID, tagID}));
    }
  }
}, [notebook, userId]);

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
    history.push(getGoToLink("notesList", {notebookID, tagID}));
  }

  return (
    <NoteForm {...props} formTitle={"Add note"} onSubmit={addNew} onCancel={cancel} />
  );
};
