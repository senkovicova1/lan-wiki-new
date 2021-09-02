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
import Loader from '/imports/ui/other/loadingScreen';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditNoteContainer( props ) {

  const {
    match,
    history,
  } = props;

  const userId = Meteor.userId();

  const {notebookID, tagID, noteID} = match.params;

  const notes = useSelector( ( state ) => state.notes.value );
  const note = useMemo(() => {
    if (notes.length > 0){
      return notes.find(note => note._id === noteID);
    }
    return null;
  }, [notes, noteID]);

  const editNote = ( title, tags, body ) => {
    NotesCollection.update( noteID, {
       $set:
     {
       title,
       body,
       tags: [...tags]
     }
    }, (error, _id) => {
      if (error){
        console.log(error);
      } else {
        history.goBack();
      }
    } );
  }

  const close = () => {
    history.goBack();
  }

  return (
    <NoteForm {...props} {...note} formTitle={"Edit note"} onSubmit={editNote} onCancel={close} />
  );
};
