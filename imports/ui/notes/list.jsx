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
  const notebooks = useSelector( ( state ) => state.notebooks.value );

  const description = useMemo(() => {
    if (notebookID){
      const notebook = notebooks.find(notebook => notebook._id === notebookID);
      return notebook && notebook.description ? notebook.description : "No description";
    } else {
      const tag = tags.find(tag => tag._id === tagID);
      return tag && tag.description ? tag.description : "No description";
    }
  }, [notebookID, notebooks, tagID, tags]);

  const notes = useSelector( ( state ) => state.notes.value );
  const filteredNotes = useMemo( () => {
    if (notebookID){
      return notes.filter(note => note.notebook === notebookID);
    }
      return notes.filter(note => {
        const tagIds = note.tags.map(tag => tag._id);
        return tagIds.includes(tagID);
      });
  }, [ notes, notebookID, tagID ] );

  const searchedNotes = useMemo(() => {
    return filteredNotes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, filteredNotes]);

  const yellowMatch = ( string ) => {
    if ( search.length === 0 || !string.toLowerCase().includes( search.toLowerCase() ) ) {
      return string;
    }
    let startIndex = string.toLowerCase().indexOf( search.toLowerCase() );
    let endIndex = startIndex + search.length;
    return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex-1, endIndex )} </span> {string.substring(endIndex )} </span>;
  }

  const filterType = notebookID ? "notebooks" : "tags";

  return (
    <List>
      <span className="message">
        {description}
        </span>

      {
        searchedNotes.length === 0 &&
        <span className="message">
          {notebookID ? "You have no notes in this notebook." : "There are no notes with this tag."}
          </span>
      }

      {searchedNotes.length > 0 &&
        searchedNotes.map((note) => (
        <div key={note._id} onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteDetail", {noteID: note._id, filterType}))}}>
          <span className="title">{yellowMatch(note.title)}</span>
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
