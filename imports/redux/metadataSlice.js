import {
  createSlice
} from '@reduxjs/toolkit'

import {
  PLAIN
} from "/imports/other/constants";

export const metadataSlice = createSlice( {
  name: 'metadata',
  initialState: {
    value: {
      layout: PLAIN,
      sortBy: "name",
      sortDirection: "asc",
      search: "",
    },
  },
  reducers: {
    setAllMetadata: ( state, action ) => {
      state.value = action.payload
    },
    setLayout: ( state, action ) => {
      state.value = {
        ...state.value,
        layout: action.payload,
      }
    },
    setSortBy: ( state, action ) => {
      state.value = {
        ...state.value,
        sortBy: action.payload,
      }
    },
    setSortDirection: ( state, action ) => {
      state.value = {
        ...state.value,
        sortDirection: action.payload,
      }
    },
    setSearch: ( state, action ) => {
      state.value = {
        ...state.value,
        search: action.payload,
      }
    },
  },
} )

export const {
  setAllMetadata,
  setLayout,
  setSortBy,
  setSortDirection,
  setSearch
} = metadataSlice.actions

export default metadataSlice.reducer