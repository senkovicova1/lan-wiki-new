import React, {
  useMemo,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useTracker
} from 'meteor/react-meteor-data';

import {
  NotebooksCollection
} from '/imports/api/notebooksCollection';

import { setArchivedNotebooks } from '/imports/redux/archivedNotebooksSlice';

import {
  setSearch,
} from '/imports/redux/metadataSlice';

import { FolderIcon, SearchIcon, CloseIcon } from  "/imports/other/styles/icons";
import {
  List,
  Card,
  SearchSection,
  Input,
  LinkButton,
} from "/imports/other/styles/styledComponents";

import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function ArchivedNotebooksList( props ) {
  const dispatch = useDispatch();

  const {
    match,
    history,
    narrow,
  } = props;

  const userId = Meteor.userId();

  const {
    search,
    sortBy,
    sortDirection
  } = useSelector( ( state ) => state.metadata.value );

  const notebooks = useTracker( () => NotebooksCollection.find( { users:  { $elemMatch: { _id: userId, active: true } }, archived: true } ).fetch() );

  useEffect(() => {
    if (notebooks.length > 0){
      dispatch(
        setArchivedNotebooks(
          [
            ...notebooks.map(notebook => ({...notebook, label: notebook.name, value: notebook._id}))
          ]
        )
      );
    } else {
      dispatch(setArchivedNotebooks([]));
    }
  }, [notebooks]);

  const searchedNotebooks = useMemo(() => {
    return notebooks.filter(notebook => notebook.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, notebooks]);

  const sortedNotebooks = useMemo(() => {
    const multiplier = !sortDirection || sortDirection === "asc" ? -1 : 1;
    return searchedNotebooks
    .sort((p1, p2) => {
      if (sortBy === "date"){
        return p1.createdDate < p2.createdDate ? 1*multiplier : (-1)*multiplier;
      }
        return p1.name.toLowerCase() < p2.name.toLowerCase() ? 1*multiplier : (-1)*multiplier;
    });
  }, [searchedNotebooks, sortBy, sortDirection]);

    const yellowMatch = ( string ) => {
      if ( search.length === 0 || !string.toLowerCase().includes( search.toLowerCase() ) ) {
        return string;
      }
      let startIndex = string.toLowerCase().indexOf( search.toLowerCase() );
      let endIndex = startIndex + search.length;
      return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex-1, endIndex )} </span> {string.substring(endIndex )} </span>;
    }

  return (
    <List narrow={true}>

      <h2>Archived notebooks</h2>
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
      </span>

      <Card noPadding={true}>
      {
        sortedNotebooks.length === 0 &&
        <span className="message">You have no archived notebooks</span>
      }
      {
        sortedNotebooks.length > 0 &&
        <div
          className="note-list-head"
          key={0}
          >
          <span
            className="title"
            >
            Title
          </span>
        </div>
      }
      {
        sortedNotebooks.map(notebook =>
          <div
            className="note-list-item"
            key={notebook._id}
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink("archivedNotesList", {notebookID: notebook._id}))
            }}
            >
            <img
              style={{marginRight: "0.3em"}}
              className="icon"
              src={FolderIcon}
              alt=""
              />
            <span
              className="title"
              >
              {notebook ? yellowMatch(notebook.name) : "Untitled"}
            </span>
          </div>
        )
      }
    </Card>
    </List>
  );
};
