import {
  configureStore
} from '@reduxjs/toolkit'
import notebooksReducer from './notebooksSlice';
import archivedNotebooksReducer from './archivedNotebooksSlice';
import notesReducer from './notesSlice';
import archivedNotesReducer from './archivedNotesSlice';
import tagsReducer from './tagsSlice';
import usersReducer from './usersSlice';

export default configureStore( {
  reducer: {
    notebooks: notebooksReducer,
    archivedNotebooks: archivedNotebooksReducer,
    notes: notesReducer,
    archivedNotes: archivedNotesReducer,
    tags: tagsReducer,
    users: usersReducer,
  },
} )