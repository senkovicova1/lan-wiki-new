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
  ViewInput,
  ViewTextarea,
  FloatingButton
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg,
  addImagesToText,
  handleMedia
} from '/imports/other/helperFunctions';
import {
  PLAIN,
  COLUMNS
} from "/imports/other/constants";

export default function ArchivedNoteDetail( props ) {

  const {
    match,
    history
  } = props;

  const userId = Meteor.userId();
  const layout = useSelector( ( state ) => state.metadata.value ).layout;

  const {notebookID, tagID, noteID} = match.params;

  const notes = useSelector( ( state ) => state.archivedNotes.value );
  const note = useMemo(() => {
    if (notes.length > 0){
      return notes.find(note => note._id === noteID);
    }
    return {}
  }, [notes, noteID]);

  const notebooks = useSelector((state) => state.archivedNotebooks.value);
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

  return (
    <Form style={layout === COLUMNS ? {backgroundColor: "white"} : {}}>

      <h2>{note.title}</h2>

      <section>
        {
          note.tags &&
          note.tags.map(tag => (
          <span className="tag" key={tag._id} style={{backgroundColor: tag.colour}}>{tag.name}</span>
        ))}
      </section>

      <section className="description">
          <div
            dangerouslySetInnerHTML={{
              __html: note?.body ? addImagesToText(handleMedia(note.body)) : "No description",
          }}
          >
        </div>
      </section>

    </Form>
  );
};
