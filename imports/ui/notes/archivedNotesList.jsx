import React, {
  useMemo,
  useEffect
} from 'react';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  useTracker
} from 'meteor/react-meteor-data';

import {
  Modal,
  ModalBody
} from 'reactstrap';

import NoteDetail from '/imports/ui/notes/archivedView';

import { setArchivedNotes } from '/imports/redux/archivedNotesSlice';

import {
  NotesCollection
} from '/imports/api/notesCollection';

import { CloseIcon } from  "/imports/other/styles/icons";

import {
  List,
  LinkButton
} from "/imports/other/styles/styledComponents";

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function ArchivedNotesList( props ) {
  const dispatch = useDispatch();

  const {
    match,
    history,
    search,
    sortBy,
    sortDirection,
    narrow
  } = props;

  const {notebookID, noteID} = match.params;
  const userId = Meteor.userId();

  const notes = useTracker( () => NotesCollection.find( { notebook: notebookID} ).fetch() );

  const tags = useSelector( ( state ) => state.tags.value );

  const archivedNotebooks = useSelector( ( state ) => state.archivedNotebooks.value );
    const notebook = useMemo(() => {
        return archivedNotebooks.find(notebook => notebook._id === notebookID);
    }, [notebookID, archivedNotebooks]);

    const description = notebook ? notebook.description : "";
    const heading = notebook ? notebook.name : "Unnamed";

  const taggedNotes = useMemo( () => {
    if ( notes.length > 0 && tags.length > 0) {
      return notes.map(note => ({
        ...note,
        tags: note.tags.map(t1 => ({...tags.find(t2 => t1 === t2._id)}))
      }));
    }
    return [];
  }, [ notes, tags ] );

  useEffect(() => {
    if (taggedNotes.length > 0){
      dispatch(setArchivedNotes(taggedNotes));
    } else {
      dispatch(setArchivedNotes([]));
    }
  }, [taggedNotes]);

  const searchedNotes = useMemo(() => {
    return taggedNotes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, taggedNotes]);

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
    return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex-1, endIndex )} </span> {string.substring(endIndex )} </span>;
  }

  return (
    <List narrow={narrow}>

      {
        sortedNotes.length === 0 &&
        <span className="message">You have no notes in this notebook.</span>
      }

      {sortedNotes.length > 0 &&
        sortedNotes.map((note) => (
        <div key={note._id} onClick={(e) => {e.preventDefault(); history.push(getGoToLink("archivedNoteDetail", {notebookID, noteID: note._id}))}}>
          <span className="title" style={note._id === noteID ? {color: "#0078d4"} : {}}>{yellowMatch(note.title)}</span>
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
        <Modal isOpen={true} className="wide bkg-grey">
          <ModalBody>
            <div style={{position: "relative"}}>
              <LinkButton
                style={{position: "absolute", right: "0"}}
                font={"grey"}
                onClick={() => history.goBack()}
                >
                <img
                  className="icon"
                  src={CloseIcon}
                  className="basic-icon"
                  alt="Close icon not found"
                  />
              </LinkButton>
            </div>
                <NoteDetail {...props} />            
          </ModalBody>
        </Modal>
      }

    </List>
  );
};
