import React from 'react';
import {
  useSelector
} from 'react-redux';

import NotesList from '/imports/ui/notes/list';
import NoteDetail from '/imports/ui/notes/view';
import AddNote from '/imports/ui/notes/addContainer';
import EditNote from '/imports/ui/notes/editContainer';

import {
  Card,
} from "/imports/other/styles/styledComponents";

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
      case "/:filterType/:categoryID/notes/:noteID/view":
        return <NoteDetail {...props} />;
      case "/:filterType/:categoryID/notes/:noteID/edit":
        return <EditNote {...props} />;
      default:
        return <NotesList narrow={true} {...props} />;
    }
  }

  return (
    <div style={{display: "flex",  height: "-webkit-fill-available", width: "-webkit-fill-available"}}>
      <div style={{width: "600px"}}>
        <NotesList {...props} />
      </div>
      <div style={{width: "-webkit-fill-available", backgroundColor: "transparent", height: "-webkit-fill-available", borderLeft: "0px solid #d6d6d6"}}>
        {
          noteID &&
          match.path === "/:filterType/:categoryID/notes/:noteID/view" &&
          <NoteDetail narrow={true} {...props} />
        }
          {
            noteID &&
            match.path === "/:filterType/:categoryID/notes/:noteID/edit" &&
            <EditNote narrow={true} {...props} />
          }
        {
          !noteID &&
          <Card style={{marginTop: "63.5px"}}>
            <div style={{paddingLeft: "20px"}}><h2>No chosen note</h2> </div>
          </Card>
      }
      </div>
    </div>
  );
};
