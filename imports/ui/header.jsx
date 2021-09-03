import React, {
  useState,
//  useEffect,
  useMemo
} from 'react';
import {
  Link
} from 'react-router-dom';
//import { useSelector } from 'react-redux';

import { SettingsIcon, MenuIcon, LogoutIcon, CloseIcon, SearchIcon, LeftArrowIcon, UserIcon } from  "/imports/other/styles/icons";

import Menu from './sidebar';

import {
  useTracker
} from 'meteor/react-meteor-data';

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';
import {
  PageHeader,
  LinkButton,
  FullButton,
  SearchSection,
  Input,
} from '../other/styles/styledComponents';
import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function Header( props ) {

  const {
    match,
    location,
    setParentOpenSidebar
    /*setSearch,
    search,*/
  } = props;

//  const folderID = match.params.folderID;

  const currentUser = useTracker( () => Meteor.user() );
  const logout = () => Meteor.logout();

  //const folders = useSelector((state) => state.folders.value);

  const [ openSidebar, setOpenSidebar ] = useState(true);
//  const [ openSearch, setOpenSearch ] = useState(true);
  const [ title, setTitle ] = useState("Lan Wiki");

    const avatar = useMemo(() => {
      if (!currentUser || !currentUser.profile.avatar){
        return null;
      }
      return uint8ArrayToImg(currentUser.profile.avatar);
    }, [currentUser]);

  return (
    <PageHeader>
      <section className="header-section">
        {
          currentUser &&
          <LinkButton
            font="white"
            onClick={(e) => {
              e.preventDefault();
              setOpenSidebar(!openSidebar);
              setParentOpenSidebar(!openSidebar);
            }}
            >
            <img
              className="icon"
              src={MenuIcon}
              alt="Menu icon not found"
              />
          </LinkButton>
        }
        <h1 onClick={(e) => props.history.push("/all/list")}>{title}</h1>
      </section>
          {/*
            currentUser &&
          <SearchSection>
            <LinkButton
              font="#0078d4"
              searchButton
              onClick={(e) => {}}
              >
              <img
                className="search-icon"
                src={SearchIcon}
                alt="Search icon not found"
                />
            </LinkButton>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        <LinkButton
          font="#0078d4"
          searchButton
          onClick={(e) => {
            e.preventDefault();
            setSearch("");
          }}
          >
          <img
            className="search-icon"
            src={CloseIcon}
            alt="Close icon not found"
            />
        </LinkButton>
    </SearchSection>
*/  }

<section className="header-section" style={{justifyContent: "flex-end"}}>
      {
        currentUser &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            props.history.push(getGoToLink("currentUserEdit"));
          }}
          >
          {
            avatar &&
          <img className="avatar" src={avatar} alt="assignedAvatar" />
          }
          {
            !avatar &&
            <img className="icon" src={UserIcon} alt="assignedAvatar" />
          }
        </LinkButton>
    }

      {
        currentUser &&
        <LinkButton
          font="white"
          onClick={(e) => {
            e.preventDefault();
            props.history.push("/login");
            logout();
          }}
          >
          <img
            className="icon"
            src={LogoutIcon}
            alt="Logout icon not found"
            />
        </LinkButton>
      }
    </section>

      {
        openSidebar &&
        currentUser &&
        <Menu {...props} closeSelf={() => setOpenSidebar(false)}/>
      }

    </PageHeader>
  );
};
