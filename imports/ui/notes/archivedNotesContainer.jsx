import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import NotesList from '/imports/ui/notes/archivedNotesList';
import NoteDetail from '/imports/ui/notes/archivedView';

import {
  List,
  FloatingButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function NotesContainer( props ) {

  const {
    match
  } = props;

  const {notebookID, noteID} = match.params;


  if (window.innerWidth <= 820){
    switch (match.path) {
      case "/archived/:notebookID":
        return <NotesList {...props} />;
      case "/archived/:notebookID/:noteID":
        return <NoteDetail {...props} />;
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
          match.path === "/archived/:notebookID/:noteID" &&
          <NoteDetail {...props} />
        }
        {
          !noteID &&
        <div> No chosen note</div>
      }
      </div>
    </div>
  );
};
