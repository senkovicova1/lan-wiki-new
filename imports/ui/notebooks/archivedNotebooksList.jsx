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

import { FolderIcon } from  "/imports/other/styles/icons";
import {
  IndexList,
} from "/imports/other/styles/styledComponents";

import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function ArchivedNotebooksList( props ) {
  const dispatch = useDispatch();

  const {
    match,
    history,
    search,
    sortBy,
    sortDirection,
  } = props;

  const userId = Meteor.userId();

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
    <IndexList>
      <h2>Archived notebooks</h2>
      {
        sortedNotebooks.length === 0 &&
        <span className="message">You have no archived notebooks</span>
      }
      {
        sortedNotebooks.map(notebook =>
          <div
            key={notebook._id}
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink("archivedNotesList", {notebookID: notebook._id}))
            }}
            >
                        <img
                          className="icon"
                          src={FolderIcon}
                          alt=""
                          />
              {yellowMatch(notebook.name)}
          </div>
        )
      }
    </IndexList>
  );
};
