import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';
import Select from 'react-select';

import CKEditorWithFileUpload from '/imports/ui/other/ckeditorWithFileUpload';

import Loader from '/imports/ui/other/loadingScreen';

import {
  Form,
  Input,
  ButtonCol,
  FullButton,
} from "/imports/other/styles/styledComponents";
import {
  selectStyle
} from '/imports/other/styles/selectStyles';
import {
  uint8ArrayToImg,
  addImagesToText
} from '/imports/other/helperFunctions';

export default function SchemeForm( props ) {

  const {
    formTitle,
    title: noteTitle,
    tags: noteTags,
    body: noteBody,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const allTags = useSelector( ( state ) => state.tags.value );

  const [ title, setTitle ] = useState("");
  const [ tags, setTags ] = useState([]);
  const [ body, setBody ] = useState( "" );

  useEffect( () => {
    if ( noteTitle ) {
      setTitle( noteTitle );
    } else {
      setTitle( "" );
    }
      if ( noteTags ) {
        setTags( noteTags.map(tag => ({...tag, label: tag.name, value: tag._id})) );
      } else {
        setTags( [] );
      }
    if ( noteBody ) {
      setBody( addImagesToText(noteBody) );
    } else {
      setBody( "" );
    }
  }, [ noteTitle, noteTags, noteBody ] );

    const editors = document.getElementsByClassName("ck-file-dialog-button");
    if (editors[0]){
      editors[0].id = "ckeditor-file-upload-button-note-form";
    }

    const tagsToChoose = allTags.filter(tag => !tags.includes(tag._id));

    if (noteTitle && noteBody.length > 0 && body.length === 0){
      return <Loader />;
    }

  return (
    <Form>

      <h1>{formTitle}</h1>

      <section>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="tags">Tags</label>
        <Select
          isMulti
          id="tags"
          name="tags"
          styles={selectStyle}
          value={tags}
          onChange={(e) => setTags(e)}
          options={tagsToChoose}
          />
      </section>

      <CKEditorWithFileUpload
        title={"Body"}
          text={body}
          setText={setBody}
          buttonId={"ckeditor-file-upload-button-note-form"}
          />

      <ButtonCol>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
        <FullButton
          colour=""
          onClick={(e) => {e.preventDefault(); onSubmit(
            title,
            tags.map(tag => tag._id),
            body
          );}}
          >
          Save
        </FullButton>
      </ButtonCol>

    </Form>
  );
};
