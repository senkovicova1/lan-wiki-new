import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import { PlusIcon, SettingsIcon } from  "/imports/other/styles/icons";

import AddTag from '/imports/ui/tags/addTagContainer';
import EditTag from '/imports/ui/tags/editTagContainer';

/*
import {
  useTracker
} from 'meteor/react-meteor-data';
*/
import {
getGoToLink
} from "/imports/other/navigationLinks";

import {
  Sidebar,
  SearchSection,
  Input,
  LinkButton
} from "/imports/other/styles/styledComponents";

export default function Menu( props ) {

  const {
    match,
    history,
    location,
    closeSelf
  } = props;

  const userId = Meteor.userId();
  const {notebookID, tagID} = match.params;
  const notebooks = useSelector((state) => state.notebooks.value);
  const tags = useSelector((state) => state.tags.value);

  const [ selectedTag, setSelectedTag ] = useState({});
  const [ tagEdit, setTagEdit ] = useState(false);
  const toggleTagEdit = () => {setTagEdit(!tagEdit);};

//  const [ search, setSearch ] = useState( "" );
//  const [ showClosed, setShowClosed ] = useState(false);
//  const [ openEdit, setOpenEdit ] = useState(false);
//  const [ folderListOpen, setFolderListOpen ] = useState(false);
//  const [ selectedFolder, setSelectedFolder ] = useState({label: translations[language].allFolders, value: "all"});

/*  const myFolders = useMemo(() => {
    let newMyFolders = folders.filter(folder => folder.users.find(user => user._id === userId));
    newMyFolders = newMyFolders.map(folder => ({...folder, label: folder.name, value: folder._id}));
    return newMyFolders;
  }, [userId, folders]);*/
/*
  const myActiveFolders = useMemo(() => {
    return [{label: translations[language].allFolders, value: "all"}, ...myFolders.filter(folder => !folder.archived), {label: translations[language].archivedFolders, value: "archived"}];
  }, [myFolders]);*/
/*
  useEffect(() => {
    if (!match.params.folderID || match.params.folderID === "all"){
      setSelectedFolder({label: translations[language].allFolders, value: "all"});
      setBackground("#0078d4");
    } else if (location.pathname == "/folders/archived"){
      setSelectedFolder({label: translations[language].archivedFolders, value: "archived"});
      setBackground("#0078d4");
    } else if (myFolders && myFolders.length > 0){
      const newFolder = myFolders.find(folder => folder._id === match.params.folderID);
      setBackground(newFolder.colour);
      setSelectedFolder(newFolder);
  } else {
    setSelectedFolder({label: translations[language].allFolders, value: "all"});
    setBackground("#0078d4");
  }
}, [match.params.folderID, location.pathname, language, myFolders]);
*/

  return (
    <Sidebar>
      {notebookID !== "all-notebooks" &&
      <LinkButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteAdd", {notebookID, tagID}));}}
        >
        <img
          className="icon"
          style={{marginRight: "0.6em"}}
          src={PlusIcon}
          alt=""
          />
        <span>
          Note
        </span>
      </LinkButton>
    }
            {
        notebooks.map(notebook =>  (
          <div className="nav" key={notebook.value}>
            <NavLink
              className={notebook.value === notebookID ? "active" : ""}
              style={notebook.value === "all-notebooks" ? {width: "100%"} : {}}
              key={notebook.value}
              to={getGoToLink("notesList", {notebookID: notebook.value, tagID})}
              onClick={() => {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                  closeSelf();
                }
              }}
              >
              <span>{notebook.label}</span>
            </NavLink>
            {
              notebook.value !== "all-notebooks" &&
            <LinkButton
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notebookEdit", {notebookID: notebook.value, tagID}))}}
              >
              <img
                className="icon"
                src={SettingsIcon}
                alt=""
                />
            </LinkButton>
          }
          </div>
          ))
      }
      <LinkButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notebookAdd"));}}
        >
        <img
          className="icon"
          style={{marginRight: "0.6em"}}
          src={PlusIcon}
          alt=""
          />
        <span>
          Notebook
        </span>
      </LinkButton>
      <hr/>
          <div className="nav" key={"all-tags"}>
            <NavLink
              className={"all-tags" === tagID ? "active" : ""}
              style={{width: "100%"}}
              key={"all-tags"}
              to={getGoToLink("notesList", {notebookID, tagID: "all-tags"})}
              onClick={() => {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                  closeSelf();
                }
              }}
              >
              <span>All tags</span>
            </NavLink>
          </div>
        {
          tags.map(tag =>  (
            <div className="nav" key={tag.value}>
              <NavLink
                className={tag.value === notebookID ? "active" : ""}
                style={tag.value === "all-tags" ? {width: "100%"} : {}}
                key={tag.value}
                to={getGoToLink("notesList", {notebookID, tagID: tag.value})}
                onClick={() => {
                  if (/Mobi|Android/i.test(navigator.userAgent)) {
                    closeSelf();
                  }
                }}
                >
                <span>{tag.name}</span>
              </NavLink>
              {
                tag.value !== "all-tags" &&
              <LinkButton
                onClick={(e) => {e.preventDefault(); setSelectedTag(tag); toggleTagEdit()}}
                >
                <img
                  className="icon"
                  src={SettingsIcon}
                  alt=""
                  />
              </LinkButton>
            }
            </div>
            ))
        }
        <AddTag />

      <Modal isOpen={tagEdit} toggle={toggleTagEdit}>
        <ModalBody>
          <EditTag {...props} tag={selectedTag} closeSelf={toggleTagEdit}/>
        </ModalBody>
      </Modal>

    </Sidebar>
  );
};
