import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  Link
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useTracker
} from 'meteor/react-meteor-data';

import { SettingsIcon, MenuIcon, LogoutIcon, CloseIcon, SearchIcon, LeftArrowIcon, UserIcon, MenuIcon2 } from  "/imports/other/styles/icons";

import Menu from './sidebar';
import SortAndLayout from '/imports/ui/other/sortAndLayout';

import { setLayout } from '/imports/redux/metadataSlice';
import {
  PLAIN,
  COLUMNS
} from "/imports/other/constants";
import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';
import {
  PageHeader,
  LinkButton,
  FullButton,
  SearchSection,
  Input,
  Sort
} from '../other/styles/styledComponents';
import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function Header( props ) {
  const dispatch = useDispatch();

  const {
    match,
    location,
    setParentOpenSidebar,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection
  } = props;

  const currentUser = useTracker( () => Meteor.user() );
  const logout = () => Meteor.logout();
  const layout = useSelector( ( state ) => state.metadata.value ).layout;

  const [ openSidebar, setOpenSidebar ] = useState(true);
  const [ openSort, setOpenSort ] = useState(false);
  const [ title, setTitle ] = useState("Lan Wiki");

    const avatar = useMemo(() => {
      if (!currentUser || !currentUser.profile.avatar){
        return null;
      }
      return uint8ArrayToImg(currentUser.profile.avatar);
    }, [currentUser]);

      useEffect(() => {
        document.addEventListener( "click", ( evt ) => {
          let targetElement = evt.target; // clicked element
          const itemsInMenu = [
            "sort-menu-button",
            "sort-menu-icon",
            "sort-menu",
            "sort-header-1",
            "sort-header-2",
            "sort-menu-plain-layout",
            "plain-layout",
            "plain-layout-label",
            "sort-menu-columns-layout",
            "columns-layout",
            "columns-layout-label",
          ];
          if (!itemsInMenu.includes(targetElement.id) && !targetElement.id.includes("order") && !targetElement.id.includes("label") && !targetElement.id.includes("sort-menu")){
            setOpenSort(false);
            return;
          }
        } );
      }, []);

    useEffect(() => {
      if (window.innerWidth >= 800) {
        setParentOpenSidebar(true);
        setOpenSidebar(true);
      } else {
        setOpenSidebar(false);
        setParentOpenSidebar(false);
      }
    }, [window.innerWidth]);

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
        <h1 onClick={(e) => props.history.push(getGoToLink(""))}>{title}</h1>
      </section>

<section className="header-section" style={{justifyContent: "flex-end"}}>
  {
    currentUser &&
    <LinkButton
      font="white"
      id="sort-menu-button"
      name="sort-menu-button"
      onClick={(e) => {
        e.preventDefault();
        setOpenSort(!openSort);
      }}
      >
      <img
        className="icon"
        id="sort-menu-icon"
        src={MenuIcon2}
        alt="MenuIcon2 icon not found"
        />
    </LinkButton>
  }
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
      {
        openSort &&
        <SortAndLayout {...props} setOpenSort={setOpenSort} />
      }

    </PageHeader>
  );
};
