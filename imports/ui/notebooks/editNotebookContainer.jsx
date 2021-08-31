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
getLink
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

/*
    useEffect( () => {
      if (folder){

        const userIsAdmin = folder.users.find(user => user._id === userId).admin;

        if ( !userIsAdmin ) {
          history.push(`/${folderID}/list`);
        }
      }

    }, [ folderID, userId, folder ] );*/

  const editNotebook = ( name, archived, users ) => {
    let data = {
      name, archived, users
    };
    NotebooksCollection.update( notebookID, {
      $set: {
        ...data
      }
    } );
    props.history.push(getLink("notesList", {notebookID: notebookID}) );
  };

  const removeNotebook = () => {
    if ( window.confirm( "Are you sure you want to permanently remove this notebook?" ) ) {
      NotebooksCollection.remove( {
        _id: notebookID
      } );
      props.history.push(getLink("", {}));
    }
  }

  const cancel = () => {
  props.history.goBack();
  }

  return (
      <NotebookForm {...notebook} onSubmit={editNotebook} onCancel={cancel} onRemove={removeNotebook}/>
  );
};
