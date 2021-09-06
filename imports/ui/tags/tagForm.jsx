import React, {
  useState,
  useEffect,
} from 'react';

import {
  Form,
  Input,
  ButtonRow,
  FullButton,
  Color
} from "/imports/other/styles/styledComponents";

const colours = [
  "#A62B2B",
  "#C92685",
  "#A063A1",
  "#5807BB",

  "#201DED",
  "#0078D4",
  "#2189AB",
  "#45BFB1",

  "#28D27A",
  "#1ADB27",
  "#92CA2B",
  "#D3D70F",

  "#FFD12B",
  "#E07F10",
  "#E01010",
];

export default function TagForm( props ) {

  const {
    _id: tagId,
    name: tagName,
    colour: tagColour,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const [ name, setName ] = useState( "" );
  const [ colour, setColour ] = useState( "" );

  useEffect( () => {
    if ( tagName ) {
      setName( tagName );
    } else {
      setName( "" );
    }
    if ( tagColour ) {
      setColour( tagColour );
    } else {
      setColour( "" );
    }
  }, [ tagName, tagColour ] );


  return (
    <Form>

      <section>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </section>

      <section className="color-picker">
        <label  htmlFor="colours">Colour</label>
        <div className="colours">
          {
            colours.slice(0,5).map(colourToChoose => (
              <Color key={colourToChoose} active={colourToChoose === colour && true} className="colour" style={{backgroundColor: colourToChoose}} onClick={() => setColour(colourToChoose)}>
              </Color>
            ))
          }
        </div>
        <div className="colours">
          {
            colours.slice(5,10).map(colourToChoose => (
              <Color key={colourToChoose} active={colourToChoose === colour && true} className="colour" style={{backgroundColor: colourToChoose}} onClick={() => setColour(colourToChoose)}>
              </Color>
            ))
          }
        </div>
        <div className="colours">
          {
            colours.slice(10,15).map(colourToChoose => (
              <Color key={colourToChoose} active={colourToChoose === colour && true} className="colour" style={{backgroundColor: colourToChoose}} onClick={() => setColour(colourToChoose)}>
              </Color>
            ))
          }
        </div>
      </section>

      <ButtonRow>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel();}}>Cancel</FullButton>
        {false  && onRemove &&
          <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove(tagId);}}>Delete</FullButton>
        }
        <FullButton
          colour=""
          disabled={name.length === 0}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(
              name,
              colour,
            );
          }}
          >
          Save
        </FullButton>
      </ButtonRow>

    </Form>
  );
};
