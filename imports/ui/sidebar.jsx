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

import { PlusIcon, SettingsIcon, FolderIcon, TagIcon, ArchiveIcon, UserIcon } from  "/imports/other/styles/icons";

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
    <div className="nav full-width" key={"all-notes"}>
      <NavLink
        className={"all-notes" === notebookID ? "active" : ""}
        key={"all-notes"}
        to={getGoToLink("notesInNotebook", {notebookID: "all-notes"})}
        >
        <img
          className="icon"
          src={FolderIcon}
          alt=""
          />
        <span>All notes</span>
      </NavLink>
    </div>

            {
        notebooks.map(notebook =>  (
          <div className="nav" key={notebook.value}>
            <NavLink
              className={notebook.value === notebookID ? "active" : ""}
              key={notebook.value}
              to={getGoToLink("notesInNotebook", {notebookID: notebook._id})}
              >
              <img
                className="icon"
                src={FolderIcon}
                alt=""
                />
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

    {
      false &&
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
                    <h3>Tags</h3>
        </div>
      }
                {
            tags.map(tag =>  (
              <div className="nav" key={tag.value}>
                <NavLink
                  className={tag.value === tagID ? "active" : ""}
                  key={tag.value}
                  to={getGoToLink("notesWithTag", {tagID: tag._id})}
                  >
                  <img
                    className="icon"
                    src={TagIcon}
                    alt=""
                    />
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

          <div className="nav full" key="archived">
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
              <img
                className="icon"
                src={ArchiveIcon}
                alt=""
                />
              <span>Archived</span>
            </NavLink>
          </div>
          {
            currentUser &&
            currentUser.profile.rights &&
            currentUser.profile.rights.editUsers &&
                      <div className="nav full" key="users">
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
          <img
            className="icon"
            src={UserIcon}
            alt=""
            />
          <span>Users</span>
        </NavLink>
        </div>
      }

      <Modal isOpen={tagEdit} toggle={toggleTagEdit}>
        <ModalBody>
          <EditTag {...props} tag={selectedTag} closeSelf={toggleTagEdit}/>
        </ModalBody>
      </Modal>

    </Sidebar>
  );
};
