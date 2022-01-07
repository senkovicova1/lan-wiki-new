import React, {
  useState,
  useMemo
} from 'react';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  Modal,
  ModalBody
} from 'reactstrap';

import NoteDetail from '/imports/ui/notes/modalView';
import NoteEdit from '/imports/ui/notes/editContainer';

import {
  setSearch,
} from '/imports/redux/metadataSlice';

import { CloseIcon, PlusIcon, SearchIcon } from  "/imports/other/styles/icons";

import {
  List,
  Card,
  SearchSection,
  Input,
  BorderedLinkButton,
  LinkButton,
  FloatingButton
} from "/imports/other/styles/styledComponents";

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function NotesList( props ) {

  const dispatch = useDispatch();

  const {
    match,
    location,
    history,
    narrow
  } = props;

  const {notebookID, tagID, categoryID, filterType, noteID} = match.params;
  const userId = Meteor.userId();

  const tags = useSelector( ( state ) => state.tags.value );
  const notebooks = useSelector( ( state ) => state.notebooks.value );
  const {
    search,
    sortBy,
    sortDirection
  } = useSelector( ( state ) => state.metadata.value );

  const category = useMemo(() => {
    let id = notebookID ? notebookID : tagID;
    if (filterType){
      id = categoryID;
    }
    if (notebookID || (filterType === "notebooks")){
      const notebook = notebooks.find(notebook => notebook._id === id);
      return notebook ? notebook : {_id: "all-notes", name: "All notes"};
    } else {
      const tag = tags.find(tag => tag._id === id);
      return tag ? tag : null;
    }
  }, [notebookID, notebooks, tagID, tags, filterType, categoryID]);

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
      <h2>{category.name}</h2>
      <span className="command-bar">
        <SearchSection>
          <LinkButton
            font="#0078d4"
            searchButton
            onClick={(e) => {}}
            >
            <img
              className="search-icon"
              src={SearchIcon}
              alt="Search icon not found"
              />
          </LinkButton>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          />
      <LinkButton
        font="#0078d4"
        searchButton
        onClick={(e) => {
          e.preventDefault();
          dispatch(setSearch(""));
        }}
        >
        <img
          className="search-icon"
          src={CloseIcon}
          alt="Close icon not found"
          />
      </LinkButton>
        </SearchSection>
      <BorderedLinkButton
        fit={true}
        onClick={(e) => {
          e.preventDefault();
          history.push(getGoToLink("noteAdd"));
        }}
        >
        <img
          className="icon"
          style={{marginRight: "0.6em"}}
          src={PlusIcon}
          alt=""
          />
        <span>
          Note
        </span>
      </BorderedLinkButton>
    </span>


      <Card noPadding={true}>

        <div
          className="note-list-head"
          key={0}
          >
          <span
            className="title"
            >
            Title
          </span>
          <div className="tags">
            <span
              className="tag"
              key={0}
              >
              Tags
            </span>
        </div>
        </div>

        {
          sortedNotes.length === 0 &&
          <div className="note-list-item" >
            <span className="title">You have no notes here.</span>
          </div>
        }

      {
        sortedNotes.length > 0 &&
        sortedNotes.map((note) => (
        <div
          className="note-list-item"
          key={note._id}
          onClick={(e) => {
            e.preventDefault();
            history.push(getGoToLink("noteDetail", {noteID: note._id, filterType: location.pathname.includes("notebook") ? "notebooks" : "tags", categoryID: category._id}));
          }}
          >
          <span className="title" style={note._id === noteID ? {color: "#0078d4"} : {}}>{note.title ? yellowMatch(note.title) : "Untitled"}</span>
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
        <Modal isOpen={true} className="wide high bkg-grey">
          <ModalBody>
            <div style={{position: "relative"}}>
              <LinkButton
                style={{position: "absolute", right: "0"}}
                font={"grey"}
                onClick={() => {
                  if (location.pathname.includes("edit")){
                    history.goBack();
                    return;
                  }

                  if (filterType === "notebooks"){
                    history.push(getGoToLink("notesInNotebook", {notebookID: categoryID}));
                  } else {
                    history.push(getGoToLink("notesWithTag", {tagID: categoryID}));
                  }
                }}
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
    </Card>

    </List>
  );
};
