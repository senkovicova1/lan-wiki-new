import React from 'react';

import {
  NotebooksCollection
} from '/imports/api/notebooksCollection';

import NotebookForm from './notebookForm';

import {
getLink
} from "/imports/other/navigationLinks";

export default function AddNotebookContainer( props ) {

  const addNewNotebook = (  name, archived, users ) => {
    NotebooksCollection.insert( {
       name, archived, users,
    }, (error, _id) => {
      if (error){
        console.log(erro);
      } else {
        props.history.push(getLink("notesList", {notebookID: _id}) );
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
