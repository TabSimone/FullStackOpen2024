import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log("Entrato in notification slice:", action.payload);
      return action.payload
    },
  },
});






export const { showNotification  } = notificationsSlice.actions;
export default notificationsSlice.reducer;
