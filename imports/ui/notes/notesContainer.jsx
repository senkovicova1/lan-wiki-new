import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import NotesList from '/imports/ui/notes/list';
import NoteDetail from '/imports/ui/notes/view';
import AddNote from '/imports/ui/notes/addContainer';
import EditNote from '/imports/ui/notes/editContainer';

import { PlusIcon } from  "/imports/other/styles/icons";
import {
  List,
  FloatingButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function NotesContainer( props ) {

  const {
    match,
    history,
    search,
    sortBy,
    sortDirection,
  } = props;

  const {notebookID, tagID, noteID} = match.params;
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

  if (window.innerWidth <= 820){
    switch (match.path) {
      case "/notebooks/:notebookID/notes":
        return <NotesList {...props} />;
      case "/tags/:tagID/notes":
        return <NotesList {...props} />;
      case "/:filterType/:categoryID/notes/:noteID/view":
        return <NoteDetail {...props} />;
      case "/:filterType/:categoryID/notes/:noteID/edit":
        return <EditNote {...props} />;
      default:
        return <NotesList {...props} />;
    }
  }

  return (
    <div style={{display: "flex", height: "-webkit-fill-available"}}>
      <div style={{width: "-webkit-fill-available"}}>
        <NotesList {...props} />
      </div>
      <div style={{width: "200%", backgroundColor: "white"}}>
        {
          noteID &&
          match.path === "/:filterType/:categoryID/notes/:noteID/view" &&
          <NoteDetail {...props} />
        }
          {
            noteID &&
            match.path === "/:filterType/:categoryID/notes/:noteID/edit" &&
            <EditNote {...props} />
          }
        {
          !noteID &&
        <div> No chosen note</div>
      }
      </div>
    </div>
  );
};
