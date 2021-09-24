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
    location,
    history,
    search,
    sortBy,
    sortDirection,
  } = props;

  const {notebookID, tagID, categoryID, filterType, noteID} = match.params;
  const userId = Meteor.userId();

  const tags = useSelector( ( state ) => state.tags.value );
  const notebooks = useSelector( ( state ) => state.notebooks.value );

  const category = useMemo(() => {
    let id = notebookID ? notebookID : tagID;
    if (filterType){
      id = categoryID;
    }
    if (notebookID || (filterType === "notebooks")){
      const notebook = notebooks.find(notebook => notebook._id === id);
      return notebook ? notebook : null;
    } else {
      const tag = tags.find(tag => tag._id === id);
      return tag ? tag : null;
    }
  }, [notebookID, notebooks, tagID, tags, filterType, categoryID]);

  const description = category ? category.description : "";
  const heading = category ? category.name : "Unnamed";

  const notes = useSelector( ( state ) => state.notes.value );
  const filteredNotes = useMemo( () => {
    let id = notebookID ? notebookID : tagID;
    if (filterType){
      id = categoryID;
    }
    if (notebookID || (filterType === "notebooks")){
      return notes.filter(note => note.notebook === id);
    }
      return notes.filter(note => {
        const tagIds = note.tags.map(tag => tag._id);
        return tagIds.includes(id);
      });
  }, [ notes, notebookID, tagID, filterType, categoryID ] );

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
    return <span  style={{ color: "inherit" }}>  {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex-1, endIndex )} </span> {string.substring(endIndex )} </span>;
  }

  return (
    <List style={{ padding: "20px 15px"}}>
      <h2>{heading}</h2>
      <span className="message">
        {description}
        </span>

      {
        sortedNotes.length === 0 &&
        <span className="message">
          You have no notes here.
          </span>
      }

      {sortedNotes.length > 0 &&
        sortedNotes.map((note) => (
        <div
          key={note._id}
          onClick={(e) => {
            e.preventDefault();
            history.push(getGoToLink("noteDetail", {noteID: note._id, filterType: location.pathname.includes("notebook") ? "notebooks" : "tags", categoryID: category._id}));
          }}
          >
          <span className="title" style={note._id === noteID ? {color: "#0078d4"} : {}}>{yellowMatch(note.title)}</span>
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
