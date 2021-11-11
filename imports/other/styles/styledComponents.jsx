import styled from 'styled-components'

//colours
const backgroundColour = "#f6f6f6";
const phColour = "#004578";
const basicBlueColour = "#0078d4";
const lightBlueColour = "#deeaf3";

//numeric values
const contentOffset = "calc((100vw - 800px)/2)";
const sidebarWidthWeb = "250px";
const sidebarWidthMobile = "300px";
const inputOffset = "15px";

export const MainPage = styled.div `
  font-size: 1em;
  text-align: left;
  line-height: 1.5em;

  h1, h2, h3, h4 {
    font-weight: lighter;
  }

  h2 {
    font-size: 1.3em;
    color: black;
    margin-top: 0em;
    margin-bottom: 0em;
    line-height: 48px;
  }

  ul {
    list-style-type: none;
  }

  .ck ul, form ul {
    list-style-type: circle !important;
  }

  label {
    margin: 0px;
  }

  hr{
    color: #d6d6d6;
    margin: 0px;
    opacity: 1;
  }

  img.icon {
    height: 1em !important;
    filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(90%) contrast(101%);
  }

  img.avatar {
    width:32px;
    height: 32px;
    border-radius: 50px;
  }

  img.scheme{
    width: auto;
    max-width: 100%;
    height: auto;
    border-radius: 0px;
    margin: 0px;
    cursor: zoom-in;
  }

  img.enlarged-scheme{
    width: 100%;
    height: auto;
    border-radius: 0px;
    margin: 0px;
    cursor: zoom-in;
  }

  .cke_content > iframe{
  width: 100% !important;
  }
  .cke_contents > iframe{
  width: 100% !important;
  }

  .ck-editor__editable_inline {
      min-height: 200px;
  }

  .spinner{
    width: 1em !important;
    height: 1em !important;
  }
`;

export const MobilePageHeader = styled.header `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 50px;
  background-color: ${basicBlueColour};
    padding: 0px ${inputOffset};
    i {
      font-size: 1.5em;
    }
    img.icon {
      filter: invert(1);
      height: 1.5em;
      width: 1.5em;
      margin-right: 0px;
    }
    img.search-icon{
      height: 1.3em;
      width: 1.3em;
    }
    button{
      i{
        margin: 0px !important;
      }
      margin-right: 1em;
    }
    button:last-of-type{
        margin: 0px !important;
    }

    h1 {
      height: 32px;
      padding-left: 0em;
      display: inline;
      font-size: 1.5em;
      color: white;
      margin-bottom: 0em;
    }

    div.search-section{
      width: -webkit-fill-available;
      input{
        width: -webkit-fill-available;
        border: none !important;
        outline: none !important;
      }
      input:focus{
        border: none !important;
      }
    }
`;

export const PageHeader = styled.header `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 50px;
  background-color: ${basicBlueColour};
  padding: 0px ${inputOffset};

  section.header-section{
    width: 300px;
    align-items: center;
    display: flex;

     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;

  button{
    margin-right: 1em;
  }
  button:last-of-type{
    margin: 0px !important;
  }

  h1 {
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
    height: 32px;
    padding-left: 0em;
    display: inline;
    font-size: 1.5em;
    color: white;
    margin-bottom: 0em;
    margin-left: 1em;
  }

  h1:hover{
    cursor: pointer;
  }

  img.icon {
    filter: invert(1);
    height: 1.5em;
    width: 1.5em;
    margin-right: 0px;
  }
  }

  div.search-section{
    width: -webkit-fill-available;
    input{
      width: -webkit-fill-available;
      border: none !important;
      outline: none !important;
    }
    input:focus{
      border: none !important;
    }
`;

export const SearchSection = styled.section `
  display: flex;
  width: 800px !important;
  input{
    width: -webkit-fill-available;
    border: none !important;
    outline: none !important;
  }
  input:focus{
    border: none !important;
  }

    img.search-icon{
      height: 1.3em;
      width: 1.3em;
    }

  button:last-of-type {
    margin-left: 0em !important;
    margin-right: 1em;
    padding-left: ${inputOffset};
  }

  button:first-of-type {
    margin-right: 0em;
    padding-left: ${inputOffset};
    margin-left: ${inputOffset};
  }
`;

export const Content = styled.main `
  display: block;
  height: calc(100vh - 50px);
  @media all and (max-width: 799px), @media handheld {
    width: 100%;
  }
  @media all and (min-width: 800px) and (max-width: 1299px){
    ${(props) =>
      props.withSidebar &&
      `
        max-width: 800px;
        margin-left: 250px;
        margin-right: auto;
      `
    }
    ${(props) =>
      !props.withSidebar &&
      `
      padding-left: calc(50vw - 400px);
      padding-right: calc(50vw - 400px);
      margin: 0px;
      overflow-y: overlay;
      `
    }
  }
  @media all and (min-width: 1300px) {
    ${(props) =>
      props.withSidebar &&
      `
        padding-left: 250px;
        padding-right: 0px;
        margin: 0px;
        overflow-y: auto;
      `
    }
    ${(props) =>
      !props.withSidebar &&
      `
      margin: 0px;
        margin-left: auto;
        margin-right: auto;
        overflow-y: auto;
      `
    }
  }
`;

export const Breadcrumbs = styled.div`
  width: 100%;
  padding: 0em ${inputOffset};
  display: flex;
  font-size: 1.3em;
  font-weight: 300 !important;
  &>span{
    display: flex;
    align-items: center;
  }
  &>span>button{
    font-weight: 300 !important;
    margin: 0em 0.3em;
    text-decoration: underline;
    text-decoration-thickness: from-font;
    text-underline-offset: 0.2em;
    }
  &>span:last-of-type>button{
    color: black !important;
    text-decoration: none;
  }
  &>span:first-of-type>button{
    margin-left: 0px !important;
  }
`;

export const Sidebar = styled.section `
  background-color: ${backgroundColour};
  position: absolute;
  left: 0;
  top: 50px;
  box-shadow: none;
  border-right: 0px solid #d6d6d6;
  width: ${sidebarWidthWeb};
  background-color: white;
  height: calc(100vh - 50px);
  z-index: 3;
  padding: 0px;

  button {
    padding: 10px ${inputOffset};
    height: 3em;
  }
  a {
    width: calc(100%);
    color: black;
    display: flex;
    align-items: center;
    height: 3em;
    padding: 10px calc(${inputOffset});
    text-decoration: none !important;
  }

  a img{
    margin-right: 0.6em;
    filter: invert(1%) !important;
  }

  a.active {
    background-color: ${basicBlueColour}22;
    color: ${basicBlueColour};
    width: calc(100% - ${inputOffset} - 26px);
  }

  a.active img{
    filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(80%) contrast(101%) !important;
  }

  div.nav.full-width a{
    width: 100% !important;
  }

  div.nav{
    justify-content: space-between;

    button{
      margin: 0px;
      padding: 0px 0px 0px 0px;
      display: none;
      width: 41px;
      img.icon{
        filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(80%) contrast(101%);
      }
    }

    a.active + button {
      background-color: ${basicBlueColour}22 !important;
      display: flex;
    }
  }

  div.nav.full>a{
    padding: ${inputOffset};
    img{
      margin-right: 0.6em;
    }
  }

  div.header{
    color: black;
    padding: 10px ${inputOffset};
    display: flex;
    align-items: center;
  }

  div.header>h3{
    font-size: 1em;
    margin: 0px;
  }
    div.header>img{
      font-size: 1em;
      margin-right: 0.6em;
        filter: invert(0);
    }
`;

export const ButtonRow = styled.section `
  display: flex;
  margin-top: 0em !important;
  margin-bottom: 0em;
  button:first-of-type{
    margin-right: 0.5em;
  }
  button:last-of-type{
    margin-left: 0.5em;
  }
`;

export const ButtonCol = styled.section `
  margin-top: 0em !important;
  button:not(last-of-type) {
    margin-bottom: 1.5em;
  }
  button:last-of-type {
    margin-bottom: 0em;
  }
`;

export const LinkButton = styled.button `
  color: ${(props) => props.font ? props.font : basicBlueColour};
  padding: 0px;
  height: 2.5em;
  background-color: ${(props) => props.searchButton ? "white" : "transparent" } !important;
  outline: none !important;
  border: none !important;
  line-height: 1em;
  display: flex;
  align-items: center;
  i, img {
    margin-right: ${(props) => props.searchButton ? "0.6em" : "0.3em" }
  }
  img {
    ${(props) => props.searchButton && `
      filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(191deg) brightness(97%) contrast(101%) !important;
      `};
    ${(props) => props.font === "grey" && `
      filter: invert(0.7) !important;
      width: 1em !important;
      `};
  }

  img.basic-icon {
      height: 1.5em;
      width: 1.5em;
      filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(90%) contrast(101%);
  }
`;

export const FullButton = styled.button `
  width: 100%;
  color: white;
  padding: 0px;
  background-color: ${(props) => props.colour ? props.colour : "#0078d4" } !important;
  outline: none !important;
  border: none !important;
  line-height: 2em;
  height: 2em;
  align-items: center;
  padding: 0px 0.5em;
  i, img.icon {
    margin-right: 0.3em;
  }
  img.icon{
    filter: invert(1) !important;
  }
`;

export const FloatingButton = styled.button `
  color: white;
  padding: 0px 0.8em;
  height: 2.5em;
  background-color: ${(props) => props.font ? props.font : basicBlueColour};
  outline: none !important;
  border: none !important;
  border-radius: 1.5em;
  align-items: center;
  position: absolute;
  bottom: 40px;
  ${(props) => props.left &&
  `
  left: ${inputOffset};
  `};
  ${(props) => !props.left &&
  `
  right: ${inputOffset};
  `};
  display: flex;

  span{
    vertical-align: text-bottom;
    margin-left: 0.3em;
  }
  img.icon{
    filter: invert(1) !important;
  }
`;

export const List = styled.section `
  width: ${(props) => props.narrow ? '' : "100%"};
  ${(props) => props.narrow ?
    `
    padding: 0px;
    padding-left: calc(50vw - 400px - 230px);
    padding-right: calc(50vw - 400px);
    margin: 0px !important;
    `
    :
  `
  padding: 0px 15px;
  `
};

  &>div{
    display: flex;
    line-height: 3em;
    margin: 0em;
    border-bottom: 0px solid #d6d6d6;
  }

  &>div:hover{
    cursor: pointer;
    color: ${basicBlueColour};
  }

  &>div>div.tags{
    margin-left: auto;
  }

    &>div>div.tags>span.tag{
      color: white;
      padding: 0.3em;
      margin-left: 0.3em;
    }
      h2{
        line-height: 48px;
      }
      span.message{
        margin-left: 0px !important;
      }
`;

export const IndexList = styled.section `
  width: ${(props) => props.narrow ? '' : "100%"};
  ${(props) => props.narrow ?
    `
    padding: 0px;
    padding-left: calc(50vw - 400px - 230px);
    padding-right: calc(50vw - 400px);
    margin: 0px !important;
    `
    :
  `
  padding: 0px 15px;
  `
  };
  height: -webkit-fill-available;
  position: relative;
  color: ${basicBlueColour};

  &>div{
    display: flex;
    line-height: 3em;
    margin: 0em;
  }

  &>div:hover{
    cursor: pointer;
  }

  &>div>.icon{
    align-self: center;
    margin-right: 0.6em;
  }

  h2{
    line-height: 48px;
  }
  span.message{
    margin-left: 0px !important;
  }
`;

export const ItemContainer = styled.section `
  &:hover{
    cursor: pointer;
  }

  margin: 0em ${inputOffset};
  height: 3em;
  display: flex;
  align-items: center;
  color: ${basicBlueColour};

  input[type=checkbox]{
    width: 1.5em !important;
    height: 1.5em !important;
  }

  &> span {
    margin-right: auto;
    padding: 10px;
    width: calc(100% - 6em);
    overflow-wrap: anywhere;
  }

  img.icon{
    height: 1.3em;
    filter: invert(32%) sepia(81%) saturate(4601%) hue-rotate(210deg) brightness(90%) contrast(101%);
  }

  img.folder{
    margin-right: 0.3em;
  }

  img.avatar {
    margin-right: 0.6em;
  }
`;

export const Form = styled.form `
  width: ${(props) => props.narrow ? '' : "-webkit-fill-available"};
  ${(props) => props.narrow ?
    `
    padding: 0px;
    padding-left: calc(50vw - 400px - 230px);
    padding-right: calc(50vw - 400px);
    margin: 0px !important;
    `
    :
  `
  padding: 0px 15px;
  `
  };

  h2{
    margin-top: 0px;
    font-weight: 200 !important;
  }
  section {
  margin: 1.5em 0em;
    i {
      font-size: 1.5em;
    }

    div.flex{
      display: flex;
      img{
        margin: 0px;
      }
    }
    img {
      width: auto;
      max-width: 500px;
      height: auto;
      max-height: 500px;
      border-radius: 0px;
    }

    img.icon {
      width:32px;
      height: 32px;
      border-radius: 50px;
      margin-right: 1em;
    }

    label{
      margin: 0px 1em 0em 0em;
      font-weight: 500;
    }

    input[type=text], input[type=password], input[type=datetime-local], teaxtarea, &>div {
      width: -webkit-fill-available;
    }
    section:last-of-type {
      margin: 0em !important;
    }
  }

  section.inline{
    display: flex;
    align-items: center;
  }

  section.inline label{
    width: 100px;
  }

  section.description{
    table td, table th {
      background-color: white;
      border: 1px solid #d6d6d6;
      min-width: 150px;
      padding: 0.3em 0.6em;
      text-align: center;
    }
    table tr:first-of-type td, table tr:first-of-type td {
      font-weight: 500;
    }

    blockquote{
      border-left: 4px solid #d6d6d6;
      padding: 0.5em 1em;
      font-style: italic;
    }
  }

  section.color-picker{
    label{
      display: block;
    }

    div.colours{
      display: flex;
      margin-bottom: 0.6em;
      justify-content: space-between;
      align-items: center;
    }
  }

 span.tag{
   color: white;
   padding: 0.3em;
   margin-right: 0.3em;
 }

 .autosave{
   margin-left: auto;
   margin-right: 0.6em;
   width: fit-content;
   display:  flex;
   align-items: center;
 }

 .autosave input{
   width: 1.5em;
   margin-right: 0.3em;
 }
`;

export const Color = styled.div`
  height:  calc(2.5em + 10px);
  width: 18%;
  margin: 0.05em;

  border: 5px solid ${(props) => props.active ? basicBlueColour : "white"};

  &:last-of-type {
   margin-left: 0.05em;
   margin-right: 0em;
  }

  &:first-of-type {
  margin-right: 0.05em;
  margin-left: 0em;
  }

  &:hover{
    border: ${(props) => props.active ? "5px" : "0px"} solid ${basicBlueColour};
  }
`


export const Input = styled.input `
background-color: white !important;
outline: none !important;
border: ${(props) => props.error ? "1px solid red" : "1px solid #d6d6d6"};
width: ${(props) => props.width ? props.width : "auto"};
padding-left: 0.4em;
height: 2.5em !important;

&:focus{
  border: 1px solid ${basicBlueColour} !important;
}

&[type=checkbox]{
    vertical-align: middle;
}
`;

export const ViewInput = styled.input `
background-color: transparent !important;
outline: none !important;
border: none;
width: 100%;
height: 2.5em !important;
padding-left: 0px;

&:hover{
  cursor: default;
}
`;

export const TitleInput = styled.input `
background-color: transparent;
padding-left: 0px;
outline: none !important;
font-size: 1.5em;
font-weight: 200;
border: none;
width: ${(props) => props.width ? props.width : "auto"};
height: 2.5em !important;

&:hover{
  cursor: default;
}

&:focus{
  background-color: white;
  border: 1px solid #d6d6d6;
  padding-left: 7px;
}
`;

export const TitleInputView = styled.input `
background-color: transparent !important;
outline: none !important;
font-size: 1.5em;
border: none;
width: ${(props) => props.width ? props.width : "auto"};
height: 2.5em !important;

&:hover{
  cursor: default;
}
`;

export const Textarea = styled.textarea `
background-color: white !important;
outline: none !important;
border: 1px solid #d6d6d6;
width: 100%;
height: 8em;
padding-left: 0.4em;

&:focus{
  border: 1px solid ${basicBlueColour} !important;
}
`;

export const ViewTextarea = styled.textarea `
background-color: transparent !important;
outline: none !important;
border: none;
width: 100%;
height: 8em;
padding-left: 0px;

&:hover{
  cursor: default;
}
`;

export const Sort = styled.div`
  position: absolute;
  z-index: 999;
  background-color: white;
  box-shadow: 0px 0px 7px 0px slategrey;
  width: 350px;
  top: 50px;
  right: 20px;
  padding: ${inputOffset};
  span{
    display: flex;
    align-items: center;
    line-height: 2em;
  }
  input{
    height: 1.3em;
    width: 1.3em;
    margin-right: 0.6em;
  }
`;

export const GroupButton = styled.button `
  width: -webkit-fill-available;

  background-color: ${(props) => props.colour ? props.colour : "white"};
  color: ${(props) => props.colour ? "white" : basicBlueColour};
  outline: none !important;
  border: 1px solid ${basicBlueColour};

  border-radius: 0px;

  &:last-of-type{
    border-left: 0px;
  }
`;

export const LoginContainer = styled.div`
@media all and (max-width: 799px), @media handheld  {
  width: auto;
}
@media all and (min-width: 800px){
  width: 500px;
}

height: calc(100vh - 50px);
margin: auto;

&>div{
    height: -webkit-fill-available;
    width: inherit;
    background-color: ${backgroundColour};
    position: relative;
    display: flex;
    align-items: center;
}

h1 {
  margin: 0px;
  background-color: ${basicBlueColour};
  color: white;
  font-size: 1.5em;
  font-weight: 400;
  padding-left: 5px;
  height: 1.5em;
}
`;

export const PasswordContainer = styled.div`
&:first-of-type{
  margin-top: 0.5em;
}

&:hover, *:hover{
  cursor: pointer;
}

margin: 0em ${inputOffset};
height: 4em;
display: flex;
align-items: center;

div {
  display: inline-block;
    margin-right: auto;
    padding: 10px 0.6em;
    width: calc(100% - 6em);
    overflow-wrap: anywhere;
}

label.title {
display: block;
font-weight: 600;
color: ${basicBlueColour};
}

label.username {
display: flex;
align-items: center;
font-weight: 400;
font-size: 0.9em;
  img {
    filter: invert(0%) sepia(0%) saturate(17%) hue-rotate(322deg) brightness(102%) contrast(104%);
    margin-right: 0.3em;
  }

}

img{
  margin-right: 0em;
}


`;

export const LoadingScreen = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${backgroundColour}AA;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  div{
    margin-left: auto;
    margin-right: auto;
    span.sr-only{
      display: none;
    }
  }
`;

export const Popover = styled.div`
  position: absolute;
  border: 1px solid #DDD;
  top: 50px;
  width: auto;
  height: auto;
  background-color: white;
  padding: 0.6em;
  z-index: 99;
  right: calc(${inputOffset} + 45px);
`;

export const DifficultyInput = styled.input`
    background: linear-gradient(to left, #0bb829,#bbe147,#f4e531,#ee6e8f,#ff0053);
    width: 100%;
    border: none;
    height: 1em;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-border-radius: 5px;
        /*16x16px adjusted to be same as 14x14px on moz*/
        height: 1em;
        width: 1em;
        border-radius: 5px;
        background: white;
        border: none;
    }

    ::-moz-range-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        -moz-border-radius: 5px;
        height: 1em;
        width: 1em;
        background: white;
        border: none;
    }

    ::-ms-thumb {
        height: 1em;
        width: 1em;
        background: white;
        border: none;
    }
`;
