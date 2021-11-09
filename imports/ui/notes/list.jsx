import React, {
  useState,
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  Modal,
  ModalBody
} from 'reactstrap';

import NoteDetail from '/imports/ui/notes/view';
import NoteEdit from '/imports/ui/notes/editContainer';

import { CloseIcon } from  "/imports/other/styles/icons";

import {
  List,
  LinkButton,
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
    narrow
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
      return notebook ? notebook : {_id: "all-notes"};
    } else {
      const tag = tags.find(tag => tag._id === id);
      return tag ? tag : null;
    }
  }, [notebookID, notebooks, tagID, tags, filterType, categoryID]);

  const description = category ? category.description : "";
  let heading = category ? category.name : "Unnamed";
  if (filterType === "notebooks"){
    heading = "All notes";
  }

  const notes = useSelector( ( state ) => state.notes.value );
  const filteredNotes = useMemo( () => {
    let id = notebookID ? notebookID : tagID;
    if (filterType){
      id = categoryID;
    }
    if (notebookID || (filterType === "notebooks")){
      return notes.filter(note => id === "all-notes" || note.notebook === id);
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
    <List narrow={narrow}>
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

      {
        narrow &&
        noteID &&
        <Modal isOpen={true} className="wide bkg-grey">
          <ModalBody>
            <div style={{position: "relative"}}>
              <LinkButton
                style={{position: "absolute", right: "0"}}
                font={"grey"}
                onClick={() => history.goBack()}
                >
                <img
                  className="icon"
                  src={CloseIcon}
                  className="basic-icon"
                  alt="Close icon not found"
                  />
              </LinkButton>
            </div>
            {
              location.pathname.includes("view") &&
                <NoteDetail {...props} />
            }
            {
              location.pathname.includes("edit") &&
                <NoteEdit {...props} />
            }
          </ModalBody>
        </Modal>
      }

    </List>
  );
};
