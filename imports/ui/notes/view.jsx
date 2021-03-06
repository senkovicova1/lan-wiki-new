import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  PencilIcon,
  RestoreIcon,
  BackIcon
} from "/imports/other/styles/icons";
import {
  Form,
  Card,
  BorderedLinkButton,
  ViewInput,
  ViewTextarea,
  LinkButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg,
  addImagesToText,
  handleMedia,
} from '/imports/other/helperFunctions';
import {
  PLAIN,
  COLUMNS
} from "/imports/other/constants";

export default function NoteDetail( props ) {

  const {
    match,
    history,
    narrow
  } = props;

  const userId = Meteor.userId();
  const layout = useSelector( ( state ) => state.metadata.value ).layout;

  const {noteID, filterType, categoryID} = match.params;

  const notes = useSelector( ( state ) => state.notes.value );
  const note = useMemo(() => {
    if (notes.length > 0){
      return notes.find(note => note._id === noteID);
    }
    return {}
  }, [notes, noteID]);

  const notebooks = useSelector((state) => state.notebooks.value);
  const notebook = useMemo(() => {
    return  notebooks.find(notebook => notebook._id === note.notebook);
  }, [notebooks, note]);

  useEffect(() => {
    if (notebook){
      const userCanViewDetail = notebook.users.find(user => user._id === userId).viewItems;
      if (!userCanViewDetail){
        history.goBack();
      }
    }
  }, [notebook, userId]);

  const userCanEdit = notebook ? notebook.users.find(user => user._id === userId).editItems : false;

  return (
    <Form narrow={narrow}>
        <span className="command-bar">
          <BorderedLinkButton
            fit={true}
            onClick={(e) => {
              e.preventDefault();
              if (filterType === "notebooks"){
                history.push(
                  getGoToLink(
                    "notesInNotebook", {
                      notebookID: categoryID,
                    }
                  )
                );
              } else {
              history.push(
                getGoToLink(
                  "notesWithTag", {
                    tagID: categoryID
                  }
                )
              );
            }
            }}
            >
            <img
              className="icon"
              src={BackIcon}
              alt=""
              />
            Back
          </BorderedLinkButton>
          {
            userCanEdit &&
        <BorderedLinkButton
          fit={true}
          onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteEdit", {noteID, filterType, categoryID}));}}
          >
          <img
            className="icon"
            src={PencilIcon}
            alt=""
            />
          Edit
        </BorderedLinkButton>
      }
      </span>

      <Card>
      <h2>{note.title}</h2>

      <hr/>


      <section>
        <label style={{width: "100px"}}>Notebook:</label>
          <span>{notebook.name}</span>
      </section>

      <section>
        <label style={{width: "100px"}}>Tags:</label>
        {
          note.tags &&
          <span>
            {note.tags.map(tag => tag.name).join(", ")}
          </span>
        }
        {
          !note.tags &&
          <span>
            No tags
          </span>
        }
      </section>

      <section className="description">
          <div
            dangerouslySetInnerHTML={{
              __html: note?.body ? addImagesToText(handleMedia(note.body)) : "No description",
          }}
          >
        </div>
      </section>
    </Card>

    </Form>
  );
};
