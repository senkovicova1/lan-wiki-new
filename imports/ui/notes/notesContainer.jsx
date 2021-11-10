import React from 'react';
import {
  useSelector
} from 'react-redux';

import NotesList from '/imports/ui/notes/list';
import NoteDetail from '/imports/ui/notes/view';
import AddNote from '/imports/ui/notes/addContainer';
import EditNote from '/imports/ui/notes/editContainer';

import {
  PLAIN
} from "/imports/other/constants";

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
  const { layout } = useSelector( ( state ) => state.metadata.value );

  const filterType = notebookID ? "notebooks" : "tags";

  if (window.innerWidth <= 820 || layout === PLAIN){
    switch (match.path) {
      case "/notebooks/:notebookID/notes":
        return <NotesList narrow={true} {...props} />;
      case "/tags/:tagID/notes":
        return <NotesList narrow={true} {...props} />;
      default:
        return <NotesList narrow={true} {...props} />;
    }
  }

  return (
    <div style={{display: "flex", height: "-webkit-fill-available"}}>
      <div style={{width: "-webkit-fill-available"}}>
        <NotesList {...props} />
      </div>
      <div style={{width: "200%", backgroundColor: "white", height: "-webkit-fill-available"}}>
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
        <div style={{paddingLeft: "20px"}}><h2>No chosen note</h2> </div>
      }
      </div>
    </div>
  );
};
