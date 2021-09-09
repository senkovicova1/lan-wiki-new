import React, {
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import { FolderIcon } from  "/imports/other/styles/icons";
import {
  IndexList,
} from "/imports/other/styles/styledComponents";

import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function NotebooksList( props ) {

  const {
    match,
    history,
    search
  } = props;

  const userId = Meteor.userId();

  const notebooks = useSelector((state) => state.notebooks.value);

  const searchedNotebooks = useMemo(() => {
    return notebooks.filter(notebook => notebook.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, notebooks]);

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
      {
        searchedNotebooks.length === 0 &&
        <span className="message">You have no notebooks</span>
      }
      {
        searchedNotebooks.map(notebook =>
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
