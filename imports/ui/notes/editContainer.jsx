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

  const {notebookID, tagID, noteID, filterType} = match.params;

  const notes = useSelector( ( state ) => state.notes.value );
  const note = useMemo(() => {
    if (notes.length > 0){
      return notes.find(note => note._id === noteID);
    }
    return null;
  }, [notes, noteID]);

    const notebooks = useSelector((state) => state.notebooks.value);
    const notebook = useMemo(() => {
      return  notebooks.find(notebook => notebook._id === note.notebook);
    }, [notebooks, note]);

    useEffect(() => {
      if (notebook){
        const userCanEditNotes = notebook.users.find(user => user._id === userId).editItems;
        if (!userCanEditNotes){
          history.goBack();
        }
      }
    }, [notebook, userId]);

  const editNote = ( title, tags, notebook, body ) => {
    NotesCollection.update( noteID, {
       $set:
     {
       title,
       body,
       notebook,
       tags: [...tags]
     }
    }, (error, _id) => {
      if (error){
        console.log(error);
      } else {
        history.push(getGoToLink("noteDetail", {noteID, filterType}));
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
