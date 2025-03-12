import React, { useState } from 'react';
import Blog from './Blog'
import {  handleLogin} from '../reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux'


const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Log in to application</h2><form onSubmit={(event) => dispatch(handleLogin(event, username, password))}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
