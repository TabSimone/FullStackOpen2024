import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/login';
import { useSelector, useDispatch } from 'react-redux'
import { showNotificationWithTimeout } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    removeUser(state, action) {
      return null
    },
    setUser(state, action) {
      return action.payload
    }
  },
})


export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
export const checkUser = () => {
  return async dispatch => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
    }
    console.log('Check user')

  };
};

export const handleLogin = (event, username, password) => {
  event.preventDefault()
  console.log('handleLogin')
  console.log(username)
  console.log(password)
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password });
      console.log('User data received:', user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch(setUser(user));
      console.log('Correct credential');
    } catch (exception) {
      dispatch(showNotificationWithTimeout({ message: 'Incorrect credential', time: 2 }));
      console.log('Incorrect credential');
    }
  };
};

export const handleLogout = () => {
  console.log("Logging out...");
  return dispatch => {
    console.log("Logging out in dispatch...");
    window.localStorage.removeItem('loggedUser');
    dispatch(removeUser()); // Clear user state
    console.log('removed user');
  };
};
