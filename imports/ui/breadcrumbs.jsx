import React, {
  useMemo
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
  const {notebookID, tagID} = match.params;

  const notebooks = useSelector( ( state ) => state.notebooks.value );

  const breadcrumbs = useMemo(() => {
    if (notebooks.length > 0){
    if (match.path.includes("archived")){
      if (match.path.includes(":notebookID")){
        return <span><LinkButton onClick={(e) => {}}>Archived notebooks</LinkButton>><LinkButton onClick={(e) => {}}>{notebooks.find(nb => nb._id === notebookID).name}</LinkButton></span>;
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
    }
  }
      return <span></span>;
  }, [match.path, notebookID, notebooks]);

  return (
    <StyledBreadcrumbs>
      {breadcrumbs}
    </StyledBreadcrumbs>
  );
};
