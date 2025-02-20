import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log("Entrato in notification slice:", action.payload.message);
      return action.payload.message
    },
  },
});






export const { showNotification  } = notificationsSlice.actions;
export default notificationsSlice.reducer;
export const showNotificationWithTimeout = (content) => {
  return dispatch => {

    dispatch(showNotification( content ));
    
    
    setTimeout(() => {
      dispatch(showNotification({ message : ''}));  // Rimuove la notifica dopo il tempo
    }, content.time * 1000);  // tempo in millisecondi (10 secondi)*/
  };
};
