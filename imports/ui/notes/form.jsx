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

import { BackIcon, PencilIcon } from  "/imports/other/styles/icons";

import {
  Form,
  Card,
  TitleInput,
  Input,
  CommandRow,
  BorderedLinkButton,
  BorderedFullButton,
} from "/imports/other/styles/styledComponents";

import {
  selectStyle
} from '/imports/other/styles/selectStyles';

import {
  PLAIN
} from "/imports/other/constants";

import {
  uint8ArrayToImg,
  addImagesToText
} from '/imports/other/helperFunctions';

export default function NoteForm( props ) {

  const {
    formTitle,
    title: noteTitle,
    tags: noteTags,
    notebook: noteNotebook,
    body: noteBody,
    match,
    location,
    onSubmit,
    updateOne,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const allTags = useSelector( ( state ) => state.tags.value );
  const allNotebooks = useSelector( ( state ) => state.notebooks.value );

  const { layout } = useSelector( ( state ) => state.metadata.value );

  const [ useAutosave, setUseAutosave ] = useState(false);
  const [ userIsWritting, setUserIsWritting ] = useState(false);
  const [ saveInterval, setSaveInterval ] = useState(null);
  const [ interval, setCustomInterval ] = useState(null);

  const [ title, setTitle ] = useState("");
  const [ tags, setTags ] = useState([]);
  const [ notebook, setNotebook ] = useState( null );
  const [ body, setBody ] = useState( "" );
  const [ oldBody, setOldBody ] = useState( "" );

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
        if ( noteNotebook ) {
          const notebook =  allNotebooks.find(nb => nb._id === noteNotebook);
          setNotebook({...notebook, label: notebook.name, value: notebook._id});
        } else {
          setNotebook( null );
        }
    if ( noteBody ) {
      const newBody = addImagesToText(noteBody);
      if (body.length === 0){
        setBody( newBody );
        setOldBody(newBody);
      }
    } else {
      setBody( "" );
      setOldBody("")
    }
  }, [ noteTitle, noteTags, noteBody, noteNotebook, allNotebooks ] );

   useEffect(() => {
       setSaveInterval(setInterval(() => {
       if (useAutosave && body !== oldBody){
         setOldBody(body);
         updateOne({body});
       }
     }, 3000));
     return () => {
       clearInterval(saveInterval);
     };
   }, [body]);

    const tagsToChoose = allTags.filter(tag => !tags.includes(tag._id));
    const notebooksToChoose = allNotebooks.filter(nb => nb.users.find(u => u._id === userId).editItems);

    if (noteTitle && noteBody.length > 0 && body.length === 0){
      return <Loader />;
    }

  return (
    <Form id="form" narrow={layout === PLAIN && !location.pathname.includes("edit") && !location.pathname.includes("add") && !location.pathname.includes("view")}>

      <Card>

      <section style={{marginTop: "0px"}}>
        <TitleInput
          id="title"
          name="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (useAutosave){
              updateOne({title: e.target.value});
            }
          }}
          />
      </section>

      <section className="inline">
        <label htmlFor="notebook">Notebook</label>
        <Select
          id="notebook"
          name="notebook"
          styles={selectStyle}
          value={notebook}
          onChange={(e) => {
            setNotebook(e);
            if (useAutosave){
              updateOne({notebook: e.value});
            }
          }}
          options={notebooksToChoose}
          />
      </section>

      <section className="inline">
        <label htmlFor="tags">Tags</label>
        <Select
          isMulti
          id="tags"
          name="tags"
          styles={selectStyle}
          value={tags}
          onChange={(e) => {
            setTags(e);
            if (useAutosave){
              updateOne({tags: e.map(tag => tag.value)});
            }
          }}
          options={tagsToChoose}
          />
      </section>

      <CKEditorWithFileUpload
          text={body}
          setText={(text) => {
            setBody(text);
          }}
          buttonId={"ckeditor-file-upload-button-note-form"}
          editorIndex={0}
          />
          {
            location.pathname.includes("edit") &&
          <div className="autosave">
            <Input
              id="autosave"
              name="autosave"
              type="checkbox"
              checked={useAutosave}
              onChange={() => {
                setUseAutosave(!useAutosave);
              }}
              />
            <span htmlFor="autosave">Autosave</span>
        </div>
      }
    </Card>

    <CommandRow id="command_row">
        <BorderedLinkButton
          fit={true}
          onClick={(e) => {e.preventDefault(); onCancel();}}
          >
          <img
            className="icon"
            src={BackIcon}
            alt=""
            />
          <span>
            { useAutosave ? "Back" : "Cancel" }
          </span>
        </BorderedLinkButton>

      <BorderedFullButton
        fit={true}
        disabled={notebook === null}
        onClick={(e) => {
          e.preventDefault();
          onSubmit(
          title,
          tags.map(tag => tag._id),
          notebook.value,
          body
        );
      }}
        >
        <img
          className="icon"
          src={PencilIcon}
          alt=""
          />
        <span>
        Save
    </span>
      </BorderedFullButton>
    </CommandRow>

    </Form>
  );
};
