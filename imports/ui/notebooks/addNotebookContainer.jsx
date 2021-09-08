import React from 'react';

import {
  NotebooksCollection
} from '/imports/api/notebooksCollection';

import NotebookForm from './notebookForm';

import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function AddNotebookContainer( props ) {

  const {tagID} = props.match.params;

  const addNewNotebook = (  name, archived, description, users ) => {
    NotebooksCollection.insert( {
       name, archived, description, users,
    }, (error, _id) => {
      if (error){
        console.log(error);
      } else {
        props.history.goBack();
      }
    } );
  }

  const cancel = () => {
    props.history.goBack();
  }

  return (
        <NotebookForm onSubmit={addNewNotebook} onCancel={cancel}/>
  );
};
