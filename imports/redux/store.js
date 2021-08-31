import {
  configureStore
} from '@reduxjs/toolkit'
import notebooksReducer from './notebooksSlice';
import notesReducer from './notesSlice';
import tagsReducer from './tagsSlice';
import usersReducer from './usersSlice';

export default configureStore( {
  reducer: {
    notebooks: notebooksReducer,
    notes: notesReducer,
    tags: tagsReducer,
    users: usersReducer,
  },
} )