import loginService from '../services/login';
import { useState, useEffect } from 'react';



const useUser = () => {

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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      console.log('Correct credential');
    } catch (exception) {
      showNotification('Incorrect credential');
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