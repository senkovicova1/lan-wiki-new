import React, {
  useState,
  useEffect,
  useMemo
} from 'react';

import { useSelector } from 'react-redux';

import {
  NotebooksCollection
} from '/imports/api/notebooksCollection';

import NotebookForm from './notebookForm';

import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function EditNotebookContainer( props ) {

  const {
    match,
    history
  } = props;

  const userId = Meteor.userId();

  const {notebookID} = match.params;
  const notebooks = useSelector((state) => state.notebooks.value);
  const notebook = useMemo(() => {
    return  notebooks.find(notebook => notebook._id === notebookID);
  }, [notebooks, notebookID]);

  const editNotebook = ( name, archived, description, users ) => {
    let data = {
      name, archived, description, users
    };
    NotebooksCollection.update( notebookID, {
      $set: {
        ...data
      }
    } );
    if (archived){
      props.history.push(getGoToLink(""));
    } else {
      props.history.push(getGoToLink("notesInNotebook", {notebookID}));
    }
  };

  const removeNotebook = () => {
    if ( window.confirm( "Are you sure you want to permanently remove this notebook?" ) ) {
      NotebooksCollection.remove( {
        _id: notebookID
      } );
      props.history.push(getGoToLink(""));
    }
  }

  const cancel = () => {
  props.history.goBack();
  }

  return (
      <NotebookForm {...notebook} title={"Edit notebook"} onSubmit={editNotebook} onCancel={cancel} onRemove={removeNotebook}/>
  );
};
