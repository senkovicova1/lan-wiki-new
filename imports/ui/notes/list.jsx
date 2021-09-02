import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  List
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function NotesList( props ) {

  const {
    match,
    history,
    search
  } = props;

  const {notebookID, tagID} = match.params;
  const userId = Meteor.userId();

  const tags = useSelector( ( state ) => state.tags.value );

  const allNotes = useSelector( ( state ) => state.notes.value );
  const filteredNotes = useMemo( () => {
    if ( allNotes.length > 0 ) {
        let notes = allNotes;
        if (notebookID !== "all-notebooks"){
          notes = notes.filter(note => note.notebook === notebookID);
        }
        if (tagID !== "all-tags"){
          notes = notes.filter(note => note.tags.map(tag => tag._id).includes(tagID));
        }
      return notes;
    }
    return [];
  }, [ allNotes, notebookID, tagID ] );

  const yellowMatch = ( string ) => {
    if ( search.length === 0 || !string.toLowerCase().includes( search.toLowerCase() ) ) {
      return string;
    }
    let startIndex = string.toLowerCase().indexOf( search.toLowerCase() );
    let endIndex = startIndex + search.length;
    return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex, endIndex )} </span> {string.substring(endIndex )} </span>;
  }

  return (
    <List>
      {
        filteredNotes.length === 0 &&
        <span className="message">You have no notes in this notebook.</span>
      }

      {filteredNotes.length > 0 &&
        filteredNotes.map((note) => (
        <div key={note._id} onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteDetail", {notebookID, tagID, noteID: note._id}))}}>
          <span className="title">{note.title}</span>
          <div className="tags">
          {note.tags.map(tag => (
            <span className="tag" key={note._id + tag._id} style={{backgroundColor: tag.colour}}>{tag.name}</span>
          ))}
        </div>
        </div>
      ))
      }

    </List>
  );
};
