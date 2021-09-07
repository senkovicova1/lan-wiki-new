import React, {
  useEffect,
  useState
} from 'react';
import {
  Meteor
} from 'meteor/meteor';
import {
  useSelector
} from 'react-redux';

import {
  Breadcrumbs as StyledBreadcrumbs,
  LinkButton
} from '/imports/other/styles/styledComponents';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function Breadcrumbs( props ) {

  const {match, history, location} = props;
  const {notebookID, tagID, noteID, filterType} = match.params;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const notes = useSelector( ( state ) => state.notes.value );
  const notebooks = useSelector( ( state ) => state.notebooks.value );
  const tags = useSelector( ( state ) => state.tags.value );
  const archivedNotebooks = useSelector( ( state ) => state.archivedNotebooks.value );

  useEffect(() => {
    let result = [...breadcrumbs];
    const path = match.path.split("/");

    if (["", "notebooks"].includes(path[1])){
      result = [{ link: "notebooksList", label: "Notebooks"}];
      if (notebookID){
        const notebook = notebooks.length > 0 ? notebooks.find(nb => nb._id === notebookID) : {};
        result.push({ link: "notesInNotebook", label: notebook.label, args: {notebookID}});
      }
      if (match.path.includes("add")){
        result.push({ link: "notebookAdd", label: "Add notebook"});
      }
      if (match.path.includes("edit")){
        result.push({ link: "notebookEdit", label: "Edit notebook", args: {notebookID}});
      }
    }

    if (path[1] === "tags"){
      result = [{ link: "tagsList", label: "Tags"}];
      if (tagID){
        const tag = tags.length > 0 ? tags.find(nb => nb._id === tagID) : {};
        result.push({ link: "notesWithTag", label: tag.label, args: {tagID}});
      }
      if (match.path.includes("add")){
        result.push({ link: "tagAdd", label: "Add tag"});
      }
      if (match.path.includes("edit")){
        result.push({ link: "tagEdit", label: "Edit tag", args: {tagID}});
      }
    }

    if (path[2] === "notes" && noteID !== "add"){
      const note = notes.length > 0 ? notes.find(note => note._id === noteID) : {};
      if (filterType === "notebooks"){
        result = [{ link: "notebooksList", label: "Notebooks"}];
        const notebook = notebooks.length > 0 && note ? notebooks.find(nb => nb._id === note.notebook) : {};
        result.push({ link: "notesInNotebook", label: notebook.label, args: {notebookID: note.notebook}});
      } else if (filterType === "tags" && result.length > 2) {
        result = [result[0], result[1]];
      }
      result.push({ link: "noteDetail", label: note.title, args: {noteID, filterType}});
      if (path[4] === "edit"){
        result.push({ link: "noteEdit", label: "Edit note", args: {noteID, filterType}});
      }
    }

    if (path[2] === "notes" && noteID === "add"){
      if (filterType === "notebooks"){
        result = [{ link: "notebooksList", label: "Notebooks"}];
      }
      result.push({ link: "noteAdd", label: "Add note", args: {noteID, filterType}});
    }

    setBreadcrumbs(result);
  }, [match.path, notebookID, notebooks, tagID, tags, notes, noteID, filterType]);

  return (
    <StyledBreadcrumbs>
      {breadcrumbs.map(crumb =>
        (
        <span key={crumb.label}>
          <LinkButton
            onClick={(e) => {
              e.preventDefault();
              history.push(getGoToLink(crumb.link, crumb.args));
            }}
            >
            {crumb.label}
          </LinkButton>
          >
        </span>
        )
          )}
        </StyledBreadcrumbs>
  );
};

/*
if (match.path.includes("archived")){
  if (match.path.includes(":noteID")){
    return <span><LinkButton onClick={(e) => {e.preventDefault(); history.push(getGoToLink("archivedNotebooksList"));}}>Archived notebooks</LinkButton>><LinkButton onClick={(e) => {e.preventDefault(); history.push(getGoToLink("archivedNotesList", {notebookID: notebookID}));}}>{archivedNotebooks.find(nb => nb._id === notebookID).name}</LinkButton>><LinkButton onClick={(e) => {}}></LinkButton></span>;
  } else if (match.path.includes(":notebookID")){
    return <span><LinkButton onClick={(e) => {e.preventDefault(); history.push(getGoToLink("archivedNotebooksList"));}}>Archived notebooks</LinkButton>><LinkButton onClick={(e) => {e.preventDefault(); history.push(getGoToLink("archivedNotesList", {notebookID: notebookID}));}}>{archivedNotebooks.find(nb => nb._id === notebookID).name}</LinkButton>></span>;
  } else {
    return <span><LinkButton onClick={(e) => {}}>Archived notebooks</LinkButton>></span>;
  }
}
if (match.path.includes("users") ){
  return <span><LinkButton onClick={(e) => {}}>Users</LinkButton>></span>;
}
if (match.path.includes(":notebookID") && notebookID !== "undefined"){
  return <span><LinkButton onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notesList", {notebookID: "all-notebooks", tagID}))}}>Notebooks</LinkButton>><LinkButton onClick={(e) => {}}>{notebooks.find(nb => nb.value === notebookID).label}</LinkButton>></span>;
} else {
  return <span><LinkButton onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notesList", {notebookID: "all-notebooks", tagID}))}}>Notebooks</LinkButton>><LinkButton onClick={(e) => {}}>All notebooks</LinkButton>></span>;
}*/
