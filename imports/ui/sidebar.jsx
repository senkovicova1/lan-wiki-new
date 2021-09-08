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

import {
  useTracker
} from 'meteor/react-meteor-data';

import { PlusIcon, SettingsIcon, FolderIcon, TagIcon } from  "/imports/other/styles/icons";

import AddTag from '/imports/ui/tags/addTagContainer';
import EditTag from '/imports/ui/tags/editTagContainer';

import {
getGoToLink
} from "/imports/other/navigationLinks";

import {
  Sidebar,
  SearchSection,
  LinkButton
} from "/imports/other/styles/styledComponents";

export default function Menu( props ) {

  const {
    match,
    history,
    location,
    closeSelf
  } = props;

  const currentUser = useTracker( () => Meteor.user() );
  const userId = Meteor.userId();

  const {notebookID, tagID, filterType} = match.params;

  const notebooks = useSelector((state) => state.notebooks.value);
  const tags = useSelector((state) => state.tags.value);

  const [ selectedTag, setSelectedTag ] = useState({});
  const [ tagEdit, setTagEdit ] = useState(false);
  const toggleTagEdit = () => {setTagEdit(!tagEdit);};

  let realFilterType = filterType;
  if (!filterType && notebookID){
    realFilterType = "notebooks";
  }
  if (!filterType && tagID){
    realFilterType = "tags";
  }

  return (
    <Sidebar>
      <LinkButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteAdd", {filterType: realFilterType}));}}
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

    <div className="header">
                <img
                  className="icon"
                  src={FolderIcon}
                  alt=""
                  />
      <h2>Notebooks</h2>
    </div>
            {
        notebooks.map(notebook =>  (
          <div className="nav" key={notebook.value}>
            <NavLink
              className={notebook.value === notebookID ? "active" : ""}
              key={notebook.value}
              to={getGoToLink("notesInNotebook", {notebookID: notebook._id})}
              >
              <span>{notebook.label}</span>
            </NavLink>
            <LinkButton
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notebookEdit", {notebookID: notebook._id}))}}
              >
              <img
                className="icon"
                src={SettingsIcon}
                alt=""
                />
            </LinkButton>
          </div>
          ))
      }
      {
        currentUser &&
        currentUser.profile.rights &&
        currentUser.profile.rights.addNotebooks &&
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
    }
      <hr/>

        <div
          className="header"
          onClick={(e) => {
            e.preventDefault();
            history.push(getGoToLink("tagsList"));
          }}
          >
                    <img
                      className="icon"
                      src={TagIcon}
                      alt=""
                      />
                    <h2>Tags</h2>
        </div>
                {
            tags.map(tag =>  (
              <div className="nav" key={tag.value}>
                <NavLink
                  className={tag.value === tagID ? "active" : ""}
                  key={tag.value}
                  to={getGoToLink("notesWithTag", {tagID: tag._id})}
                  >
                  <span>{tag.label}</span>
                </NavLink>
                <LinkButton
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTag(tag);
                    toggleTagEdit();
                  }}
                  >
                  <img
                    className="icon"
                    src={SettingsIcon}
                    alt=""
                    />
                </LinkButton>
              </div>
              ))
          }
<AddTag />
          <hr/>

          <div className="nav" key="archived">
            <NavLink
              className={match.path.includes("archived") ? "active" : ""}
              style={{width: "100%"}}
              key={"archived"}
              to={getGoToLink("archivedNotebooksList")}
              onClick={() => {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                  closeSelf();
                }
              }}
              >
              <span>Archived</span>
            </NavLink>
          </div>

        <NavLink
          className={match.path === "/users/list" ? "active" : ""}
          style={{width: "100%"}}
          key={"users"}
          to={getGoToLink("usersList")}
          onClick={() => {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
              closeSelf();
            }
          }}
          >
          <span>Users</span>
        </NavLink>

      <Modal isOpen={tagEdit} toggle={toggleTagEdit}>
        <ModalBody>
          <EditTag {...props} tag={selectedTag} closeSelf={toggleTagEdit}/>
        </ModalBody>
      </Modal>

    </Sidebar>
  );
};
