import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import NotesList from '/imports/ui/notes/archivedNotesList';
import NoteDetail from '/imports/ui/notes/archivedView';

import {
  PLAIN
} from "/imports/other/constants";
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
  const layout = useSelector( ( state ) => state.metadata.value ).layout;


  if (window.innerWidth <= 820 || layout === PLAIN){
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
      <div style={{width: "200%", backgroundColor: "white", height: "-webkit-fill-available"}}>
        {
          noteID &&
          match.path === "/archived/:notebookID/:noteID" &&
          <NoteDetail {...props} />
        }
        {
          !noteID &&
        <div style={{paddingLeft: "20px"}}><h2>No chosen note</h2> </div>
      }
      </div>
    </div>
  );
};
