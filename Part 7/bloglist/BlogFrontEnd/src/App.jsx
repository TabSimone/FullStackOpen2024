import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from './reducers/userReducer';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';  
import Home from './pages/Home';  

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
      <div>
        <Navbar />
        <Notification />
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
  );
};

export default App;
