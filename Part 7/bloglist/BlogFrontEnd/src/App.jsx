import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogService';
import loginService from './services/login';
import ActionButton from './components/Button';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import useUser from './hooks/useUser';
import useBlog from './hooks/useBlog';
import LoginForm from './components/LoginForm';


const App = () => {

  const { user, handleLogin, handleLogout } = useUser();
  
  const [blogs, setBlogs] = useState([]);


  // State for notification
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);





  // New function to handle notifications
  const showNotification = (message) => {
    setNotificationMessage(message);

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };


  const { writeAttributes, increaseLikes, deleteBlog } = useBlog(showNotification);



  if (user === null) {
    return (
      <div>
        {notificationMessage && <Notification textToDisplay={notificationMessage} />}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        Welcome, {user.username}!<ActionButton onClick={() => handleLogout()} buttonText="Logout" />
      </div>

      {/* Add new blog */}
      <Togglable buttonLabel="New Blog">
        <CreateBlogForm
          createBlog={writeAttributes} user = {user}
        />
      </Togglable>

      <div>
        <h2>BLOGS </h2>
        {blogs.map(blog => (
          <Blog
            key={blog.id}  // Aggiungi una key univoca
            blog={blog}
            increaseLikes={increaseLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>


      {notificationMessage && <Notification textToDisplay={notificationMessage} />}
    </>
  );
};

export default App;