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
import Breadcrumbs from './breadcrumbs';
import EditUserContainer from './users/editUserContainer';
import AddNotebook from '/imports/ui/notebooks/addNotebookContainer';
import EditNotebook from '/imports/ui/notebooks/editNotebookContainer';
import AddNote from '/imports/ui/notes/addContainer';
import EditNote from '/imports/ui/notes/editContainer';
import NotesList from '/imports/ui/notes/list';
import NoteDetail from '/imports/ui/notes/view';

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
/*
  console.log("All our amazing icons are from FlatIcon (https://www.flaticon.com/). Thank you to all creators whose icons we could use: PixelPerfect (https://www.flaticon.com/authors/pixel-perfect), Dmitri13 (https://www.flaticon.com/authors/dmitri13), Phatplus (https://www.flaticon.com/authors/phatplus), Kiranshastry (https://www.flaticon.com/authors/kiranshastry), Those Icons (https://www.flaticon.com/authors/those-icons), Google (https://www.flaticon.com/authors/google), Dave Gandy (https://www.flaticon.com/authors/dave-gandy), Tomas Knop (https://www.flaticon.com/authors/tomas-knop), Gregor Cresnar (https://www.flaticon.com/authors/gregor-cresnar), Freepik (https://www.flaticon.com/authors/freepik)");
  */

  const currentUser = useTracker( () => Meteor.user() );
  const userId = useMemo(() => {
    if (currentUser){
      return currentUser._id;
    }
    return null;
  }, [currentUser]);

  const notebooks = useTracker( () => NotebooksCollection.find( { users:  { $elemMatch: { _id: userId, active: true } }, archived: false } ).fetch() );
  useEffect(() => {
    if (notebooks.length > 0){
      dispatch(
        setNotebooks(
          [
          {label: "All notebooks", value: "all-notebooks"},
          ...notebooks.map(notebook => ({...notebook, label: notebook.name, value: notebook._id}))
          ]
        )
      );
    }
  }, [notebooks]);

/*
  const categories = useTracker( () => CategoriesCollection.find( {} ).fetch() );
  useEffect(() => {
    if (categories.length > 0){
      dispatch(
        setCategories(
          [
          {label: "All categories", value: "all-categories"},
          ...categories.map(category => ({...category, label: category.name, value: category._id}))
          ]
        )
      );
    }
  }, [categories]);
*/

  const tags = useTracker( () => TagsCollection.find( {} ).fetch() );
  useEffect(() => {
    if (tags.length > 0){
      dispatch(setTags(tags.map(tag => ({...tag, label: tag.name, value: tag._id}))));
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
      }
    }, [notes, tags]);

  const [ search, setSearch ] = useState( "" );
  const [ openSidebar, setOpenSidebar ] = useState( false );

  return (
    <div style={{height: "100vh"}}>
      <BrowserRouter>
        <Route
          exact
          path={"/"}
          render={(props) => (
            <Reroute
              {...props}
              />
          )}
          />

        <Route
          exact
          path={[
            "/",
            getLink("login"),
            getLink("currentUserEdit"),
            getLink("noteAdd"),
            getLink("noteDetail"),
            getLink("noteEdit"),
            getLink("archivedNotebooksList"),
            getLink("archivedNotesList"),
            getLink("notebookAdd"),
            getLink("notesList"),
            getLink("notebookEdit"),
          ]}
          render={(props) => (
            <Header
              {...props}
              setSearch={setSearch}
              search={search}
              setParentOpenSidebar={setOpenSidebar}
              />
          )}
          />
        {!currentUser &&
          <Content style={{paddingLeft: "250px", paddingRight: "250px"}}>
            <Route path={["/", getLink("login")]} component={Login} />
          </Content>
        }
        {
          currentUser &&
          <Content>

            <Route
              exact
              path={[
                "/",
                getLink("noteAdd"),
                getLink("noteDetail"),
                getLink("noteEdit"),
                getLink("archivedNotebooksList"),
                getLink("archivedNotesList"),
                getLink("notebookAdd"),
                getLink("notesList"),
                getLink("notebookEdit"),
              ]}
              render={(props) => (
                <Breadcrumbs
                  {...props}
                  />
              )}
              />
            <div style={{height: "100%", position: "relative"}}>

            <Route
              exact
              path={getLink("currentUserEdit")}
              render={(props) => (
                <EditUserContainer {...props} />
              )}
              />

            <Route exact path={getLink("noteAdd")} component={AddNote}/>

            <Route exact path={getLink("noteEdit")} component={EditNote}/>

              <Route
                exact
                path={[getLink("notesList"), getLink()]}
                render={(props) => (
                  <NotesList
                    {...props}
                    search={search}
                    />
                )}
              />

            <Route exact path={getLink("noteDetail")} component={NoteDetail}/>

            <Route exact path={getLink("notebookAdd")} component={AddNotebook}/>

            <Route exact path={getLink("notebookEdit")} component={EditNotebook}/>

          </div>
        </Content>
      }
      </BrowserRouter>
    </div>
  );
};

/*

            <Route
              exact
              path={getLink("addCategory")}
              render={(props) => (
                <CategoryAdd
                  {...props}
                  />
              )}
              />

              <Route
                exact
                path={getLink("editCategory")}
                render={(props) => (
                  <CategoryEdit
                    {...props}
                    />
                )}
                />

                <Route exact path={getLink("addItem")} component={ItemAdd}/>
                <Route exact path={getLink("editItem")} component={ItemEdit}/>



                <Route exact path={getLink("viewItem")} component={ItemView}/>

                <Route exact path={getLink("schemeView")} component={SchemeView}/>
                <Route exact path={getLink("schemeDraw")} component={SchemeDraw}/>
                <Route exact path={getLink("schemeEdit")} component={SchemeEdit}/>
*/
