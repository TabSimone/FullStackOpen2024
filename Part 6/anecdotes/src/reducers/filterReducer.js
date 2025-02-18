import { createSlice } from '@reduxjs/toolkit'

const initialState = "ALL"

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      console.log("Entrato in SET_FILTER")
      return action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;