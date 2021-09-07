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

export default function TagsList( props ) {

  const {
    match,
    history,
    search
  } = props;

  const userId = Meteor.userId();

  const tags = useSelector((state) => state.tags.value);

  const searchedTags = useMemo(() => {
    return tags.filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, tags]);

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
        searchedTags.length === 0 &&
        <span className="message">You have no tags</span>
      }
      {
        searchedTags.map(tag =>
          <div
            key={tag._id}
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink("notesWithTag", {tagID: tag._id}))
            }}
            >

            <img
              className="icon"
              src={FolderIcon}
              alt=""
              />
              {yellowMatch(tag.name)}
          </div>
        )
      }
    </IndexList>
  );
};
