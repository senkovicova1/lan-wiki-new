import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import { PlusIcon } from  "/imports/other/styles/icons";
import {
  List,
  FloatingButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function NotesList( props ) {

  const {
    match,
    history,
    search,
    sortBy,
    sortDirection,
  } = props;

  const {notebookID, tagID} = match.params;
  const userId = Meteor.userId();

  const tags = useSelector( ( state ) => state.tags.value );
  const notebooks = useSelector( ( state ) => state.notebooks.value );

  const category = useMemo(() => {
    if (notebookID){
      const notebook = notebooks.find(notebook => notebook._id === notebookID);
      return notebook ? notebook : null;
    } else {
      const tag = tags.find(tag => tag._id === tagID);
      return tag ? tag : null;
    }
  }, [notebookID, notebooks, tagID, tags]);

  const description = category ? category.description : "";
  const heading = category ? category.name : "Unnamed";

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

  const sortedNotes = useMemo(() => {
    const multiplier = !sortDirection || sortDirection === "asc" ? -1 : 1;
    return searchedNotes
    .sort((p1, p2) => {
      if (sortBy === "date"){
        return p1.createdDate < p2.createdDate ? 1*multiplier : (-1)*multiplier;
      }
        return p1.title.toLowerCase() < p2.title.toLowerCase() ? 1*multiplier : (-1)*multiplier;
    });
  }, [searchedNotes, sortBy, sortDirection]);

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
      <h2>{heading}</h2>
      <span className="message">
        {description}
        </span>

      {
        sortedNotes.length === 0 &&
        <span className="message">
          {notebookID ? "You have no notes in this notebook." : "There are no notes with this tag."}
          </span>
      }

      {sortedNotes.length > 0 &&
        sortedNotes.map((note) => (
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
