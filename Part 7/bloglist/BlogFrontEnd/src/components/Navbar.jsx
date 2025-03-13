import { Link } from "react-router-dom";
import { checkUser, handleLogin, handleLogout } from '../reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux'
import ActionButton from "./Button";
import Users from '../pages/Users';


const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  const padding = { padding: 5 };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        Welcome, {user.username}!<ActionButton onClick={() => dispatch(handleLogout())} buttonText="Logout" />
      </div>
      <nav>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/users">Users</Link>
        <Link style={padding} to="/blogs">Blogs</Link>
      </nav>
    </div>
  );
};

export default Navbar;
