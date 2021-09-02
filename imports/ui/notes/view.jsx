import React, {
  useMemo,
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
  ViewInput,
  ViewTextarea,
  FloatingButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg,
  addImagesToText
} from '/imports/other/helperFunctions';

export default function NoteDetail( props ) {

  const {
    match,
    history
  } = props;

  const {notebookID, tagID, noteID} = match.params;

  const notes = useSelector( ( state ) => state.notes.value );
  const note = useMemo(() => {
    if (notes.length > 0){
      return notes.find(note => note._id === noteID);
    }
    return {}
  }, [notes, noteID]);

  return (
    <Form>

      <h1>{note.title}</h1>

      <section>
        {
          note.tags &&
          note.tags.map(tag => (
          <span className="tag" key={tag._id} style={{backgroundColor: tag.colour}}>{tag.name}</span>
        ))}
      </section>

      <section>
          <div
            dangerouslySetInnerHTML={{
              __html: note?.body ? addImagesToText(note.body) : "No description",
          }}
          >
        </div>
      </section>

          <FloatingButton
            left
            onClick={(e) => {e.preventDefault(); history.goBack();}}
            >
            <img
              style={{marginRight: "2px"}}
              src={BackIcon}
              alt=""
              className="icon"
              />
          </FloatingButton>

          <FloatingButton
            onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteEdit", {notebookID, tagID, noteID}));}}
            >
            <img
              src={PencilIcon}
              alt=""
              className="icon"
              />
          </FloatingButton>

    </Form>
  );
};
