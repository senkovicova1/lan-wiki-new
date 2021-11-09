import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  Spinner
} from 'reactstrap';

import {
  ImagesCollection
} from '/imports/api/imagesCollection';

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';

export default function CKEditorWithFileUpload( props ) {

  const {
    title,
    text,
    setText,
    buttonId,
    editorIndex
  } = props;

  const [showLoad, setShowLoad] = useState(false);

  const inputFile = useRef(null);
  const editors = document.getElementsByClassName("ck-file-dialog-button");
  useEffect(() => {
    if (editors.length > 0){
      editors[editorIndex].id = `ckeditor-file-upload-button-${editorIndex}`;
      const input = document.querySelectorAll(`span#ckeditor-file-upload-button-${editorIndex}>input`)[0];
      if (input){
        input.click = function(){
          inputFile.current.click();
        };
      }
    }
  }, [editors, editorIndex]);

  return (
    <section  className="row-notes">
      {
        title &&
      <label>{title}</label>
    }
        {
          showLoad &&
          <Spinner color="primary" size="1em" className="spinner" children=""/>
        }
      <div className="text">
        <div className="main" style={{width: "100%"}}>
          <input
            type='file'
            id={`file-input-for-${buttonId}`}
            ref={inputFile}
            style={{display: 'none'}}
            onChange={(e) =>  {
              e.persist();
              setShowLoad(true);
              var file = e.target.files[0];
              if (!file) return;
              var reader = new FileReader();
              reader.onload = function(event){
                const buffer = new Uint8Array(reader.result);
                const img = uint8ArrayToImg(buffer);

                ImagesCollection.insert( {
                  buffer
                }, ( error, imgId ) => {
                  if ( error ) {
                    console.log( error );
                  } else {
                    const imgToInsert = `<p><span class="image-inline ck-widget ck-widget_selected" contentEditable="false"><img alt="loaded-picture-${imgId}" src="${img}"></span></p>`
                    let newText = imgToInsert + text;
                    setText(newText);
                  }
                  setShowLoad(false);
                } );
              }
              reader.readAsArrayBuffer(file);
            }}
            />
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onReady={() => {
              const editors = document.getElementsByClassName("ck-file-dialog-button");
              editors[editorIndex].id = `ckeditor-file-upload-button-${editorIndex}`;

              const input = document.querySelectorAll(`span#ckeditor-file-upload-button-${editorIndex}>input`)[0];
              if (input){
                input.click = function(){
                  inputFile.current.click();
                };
              }
            }}
            onChange={(event, editor) => {
              setText(editor.getData());
            }}
            />
        </div>
      </div>
    </section>
  );
};
