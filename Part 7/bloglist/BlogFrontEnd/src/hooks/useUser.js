import loginService from '../services/login';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'





const useUser = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
      }
    }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null); // Clear user state
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    console.log('funziono?')

    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      console.log('Correct credential');
    } catch (exception) {
      dispatch(showNotificationWithTimeout({ message: 'Incorrect credential', time: 2 }));
      console.log('Incorrect credential');
    }
  };

  return {
    user,
    handleLogout,
    handleLogin
  }
}



export default useUser