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

  const {notebookID, tagID} = match.params;
  const notebooks = useSelector((state) => state.notebooks.value);
  const notebook = useMemo(() => {
    return  notebooks.find(notebook => notebook._id === notebookID);
  }, [notebooks, notebookID]);

  const editNotebook = ( name, archived, users ) => {
    let data = {
      name, archived, users
    };
    NotebooksCollection.update( notebookID, {
      $set: {
        ...data
      }
    } );
    if (archived){
      props.history.push(getGoToLink("notesList", {notebookID: "all-notebooks", tagID}));            
    } else {
      props.history.push(getGoToLink("notesList", {notebookID, tagID}));
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
      <NotebookForm {...notebook} onSubmit={editNotebook} onCancel={cancel} onRemove={removeNotebook}/>
  );
};
