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

  const addNewNotebook = (  name, archived, users ) => {
    NotebooksCollection.insert( {
       name, archived, users,
    }, (error, _id) => {
      if (error){
        console.log(erro);
      } else {
        props.history.push(getGoToLink("notesList", {notebookID: _id, tagID}) );
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
