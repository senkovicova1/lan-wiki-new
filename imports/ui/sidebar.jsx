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

const actualNotebookID = notebookID && notebookID !== "undefined" ? notebookID : "all-notebooks";
const actualTagID = tagID && tagID !== "undefined" ? tagID : "all-tags";

  return (
    <Sidebar>
      {notebookID !== "all-notebooks" &&
      <LinkButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("noteAdd", {notebookID: actualNotebookID, tagID: actualTagID}));}}
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
              to={getGoToLink("notesList", {notebookID: notebook.value, tagID: actualTagID})}
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
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notebookEdit", {notebookID: notebook.value, tagID: actualTagID}))}}
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
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("notebookAdd", {notebookID:actualNotebookID, tagID: actualTagID}));}}
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
              to={getGoToLink("notesList", {notebookID: actualNotebookID, tagID: "all-tags"})}
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
                to={getGoToLink("notesList", {notebookID: actualNotebookID, tagID: tag.value})}
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

      <hr/>

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
