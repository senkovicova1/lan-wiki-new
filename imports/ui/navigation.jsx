import React, {
  useState,
  useMemo,
 useEffect
} from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom';

import {
  useTracker
} from 'meteor/react-meteor-data';
import { useDispatch, useSelector } from 'react-redux';

import { setNotebooks } from '/imports/redux/notebooksSlice';
import { setNotes } from '/imports/redux/notesSlice';
import { setTags } from '/imports/redux/tagsSlice';
import { setUsers } from '/imports/redux/usersSlice';

import {
  NotebooksCollection
} from '/imports/api/notebooksCollection';
import {
  NotesCollection
} from '/imports/api/notesCollection';
import {
  TagsCollection
} from '/imports/api/tagsCollection';

import Reroute from './reroute';
import Header from './header';
import Login from './login';
import EditUserContainer from './users/editUserContainer';
import NotesContainer from '/imports/ui/notes/notesContainer';
import ArchivedNotesContainer from '/imports/ui/notes/archivedNotesContainer';
import NotesList from '/imports/ui/notes/list';
import AddNotebook from '/imports/ui/notebooks/addNotebookContainer';
import EditNotebook from '/imports/ui/notebooks/editNotebookContainer';
import TagsList from '/imports/ui/tags/list';
import NoteDetail from '/imports/ui/notes/view';
import AddNote from '/imports/ui/notes/addContainer';
import EditNote from '/imports/ui/notes/editContainer';
import ArchivedNotebooksList from '/imports/ui/notebooks/archivedNotebooksList';
import ArchivedNotesList from '/imports/ui/notes/archivedNotesList';
import ArchivedNoteDetail from '/imports/ui/notes/archivedView';
import UsersList from './users/list';

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';

import {
  Content
} from '/imports/other/styles/styledComponents';

import {
getLink
} from "/imports/other/navigationLinks";

export default function MainPage( props ) {
  const dispatch = useDispatch();

  console.log("All our amazing icons are from FlatIcon (https://www.flaticon.com/). Thank you to all creators whose icons we could use: PixelPerfect (https://www.flaticon.com/authors/pixel-perfect), Dmitri13 (https://www.flaticon.com/authors/dmitri13), Phatplus (https://www.flaticon.com/authors/phatplus), Kiranshastry (https://www.flaticon.com/authors/kiranshastry), Those Icons (https://www.flaticon.com/authors/those-icons), Google (https://www.flaticon.com/authors/google), Dave Gandy (https://www.flaticon.com/authors/dave-gandy), Tomas Knop (https://www.flaticon.com/authors/tomas-knop), Gregor Cresnar (https://www.flaticon.com/authors/gregor-cresnar), Freepik (https://www.flaticon.com/authors/freepik)");

  const currentUser = useTracker( () => Meteor.user() );
  const userId = Meteor.userId();

  const notebooks = useTracker( () => NotebooksCollection.find( { users:  { $elemMatch: { _id: userId, active: true } }, archived: false } ).fetch() );
  useEffect(() => {
    if (notebooks.length > 0){
      dispatch(
        setNotebooks(
          [
          ...notebooks.map(notebook => ({...notebook, label: notebook.name, value: notebook._id})).sort((c1, c2) => c1.label > c2.label ? 1 : -1)
          ]
        )
      );
    } else {
      dispatch(setNotebooks([]));
    }
  }, [notebooks]);

  const tags = useTracker( () => TagsCollection.find( {} ).fetch() );
  useEffect(() => {
    if (tags.length > 0){
      dispatch(setTags(tags.map(tag => ({...tag, label: tag.name, value: tag._id})).sort((c1, c2) => c1.label > c2.label ? 1 : -1)));
    } else {
      dispatch(setTags([]));
    }
  }, [tags]);

  const users = useTracker( () => Meteor.users.find( {} ).fetch() );
  useEffect(() => {
    dispatch(
      setUsers(
        users.map(user => ({
          _id: user._id,
          ...user.profile,
          label:  `${user.profile.name} ${user.profile.surname}`,
          value: user._id,
          img: uint8ArrayToImg(user.profile.avatar)
        }) )
      )
    );
  }, [users]);

    const notebookIds = notebooks.map(notebook => notebook._id);
    const notes = useTracker( () => NotesCollection.find( { notebook: {$in: notebookIds}} ).fetch() );
    useEffect(() => {
      if (notes.length > 0){
        dispatch(setNotes(notes.map(note => ({
            ...note,
            tags: note.tags.map(t1 => ({...tags.find(t2 => t2._id === t1)}))
        }))));
      } else {
        dispatch(setNotes([]));
      }
    }, [notes, tags]);

  const [ openSidebar, setOpenSidebar ] = useState( false );

  return (
    <div style={{height: "100vh"}}>
      <BrowserRouter>

        <Route
          exact
          path={[
            ...getLink("notebooksList"),
            getLink("notesInNotebook"),
            getLink("notebookAdd"),
            getLink("notebookEdit"),
            getLink("tagsList"),
            getLink("notesWithTag"),
            getLink("noteDetail"),
            getLink("noteEdit"),
            getLink("noteAdd"),
            getLink("archivedNotebooksList"),
            getLink("archivedNotesList"),
            getLink("archivedNoteDetail"),
            getLink("usersList"),
            getLink("currentUserEdit")
          ]}
          render={(props) => (
            <Header
              {...props}
              setParentOpenSidebar={setOpenSidebar}
              />
          )}
          />
        {!currentUser &&
          <Content withSidebar={false}>
            <Route path={["/", getLink("login")]} component={Login} />
          </Content>
        }
        {
          currentUser &&
          <Content withSidebar={openSidebar}>

            <Route path={["/"]} component={Reroute} />

            <div style={{position: "relative",  height: "-webkit-fill-available"}}>

            <Route
              exact
              path={getLink("currentUserEdit")}
              render={(props) => (
                <EditUserContainer {...props} />
              )}
              />

              <Route
                exact
                path={getLink("usersList")}
                render={(props) => (
                  <UsersList {...props}/>
                )}
                />

                  <Route
                    exact
                    path={[
                      getLink("notesInNotebook"),
                      getLink("notesWithTag"),
                      getLink("noteDetail"),
                      getLink("noteEdit")
                  ]}
                    render={(props) => (
                      <NotesContainer
                        {...props}
                        />
                    )}
                    />

                    <Route
                      exact
                      path={[
                        getLink("archivedNotesList"),
                        getLink("archivedNoteDetail"),
                    ]}
                      render={(props) => (
                        <ArchivedNotesContainer
                          {...props}
                          />
                      )}
                      />

                <Route exact path={getLink("notebookAdd")} component={AddNotebook}/>
                <Route exact path={getLink("notebookEdit")} component={EditNotebook}/>

                <Route
                  exact
                  path={getLink("tagsList")}
                  render={(props) => (
                    <TagsList
                      {...props}
                      />
                  )}
                  />

            <Route exact path={getLink("noteAdd")} component={AddNote}/>

              <Route
                exact
                path={getLink("archivedNotebooksList")}
                render={(props) => (
                  <ArchivedNotebooksList
                    {...props}
                    />
                )}
              />


          </div>
        </Content>
      }
      </BrowserRouter>
    </div>
  );
};
