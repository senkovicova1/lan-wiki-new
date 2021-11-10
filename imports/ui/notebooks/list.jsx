import React, {
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import { FolderIcon } from  "/imports/other/styles/icons";
import {
  IndexList,
} from "/imports/other/styles/styledComponents";

import {
  PLAIN
} from "/imports/other/constants";

import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function NotebooksList( props ) {

  const {
    match,
    history,
    search,
    sortBy,
    sortDirection,
  } = props;

  const userId = Meteor.userId();

  const notebooks = useSelector((state) => state.notebooks.value);

  const { layout } = useSelector( ( state ) => state.metadata.value );

  const searchedNotebooks = useMemo(() => {
    return notebooks.filter(notebook => notebook.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, notebooks]);

  const sortedNotebooks = useMemo(() => {
    const multiplier = !sortDirection || sortDirection === "asc" ? -1 : 1;
    return searchedNotebooks
    .sort((n1, n2) => {
      if (sortBy === "date"){
        return n1.createdDate < n2.createdDate ? 1*multiplier : (-1)*multiplier;
      }
        return n1.name.toLowerCase() < n2.name.toLowerCase() ? 1*multiplier : (-1)*multiplier;
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
    <IndexList narrow={layout === PLAIN}>
      <h2 style={{ marginTop: "0em", marginBottom: "0em"}}>Notebooks</h2>
      {
        sortedNotebooks.length === 0 &&
        <span className="message">You have no notebooks</span>
      }
      {
        sortedNotebooks.map(notebook =>
          <div
            key={notebook._id}
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink("notesInNotebook", {notebookID: notebook._id}))
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
