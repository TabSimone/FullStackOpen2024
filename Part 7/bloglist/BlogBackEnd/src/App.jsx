import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogService';
import loginService from './services/login';
import ActionButton from './components/Button';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // State for creating a new blog
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  // State for notification
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

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

  const writeAttributes = async (event) => {
    event.preventDefault();

    const newBlog = { title: newTitle, author: newAuthor, url: newUrl };

    try {
      console.log(user.token)
      await blogService.create(newBlog, user.token);
      console.log('Entered writeAttributes!');

      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');

      showNotification('Blog created successfully!');
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs); 
    } catch (error) {
      console.error('Error creating blog:', error.response ? error.response.data : error.message);
      showNotification('Failed to create blog. Please try again.');
    }
  };

  // New function to handle notifications
  const showNotification = (message) => {
    setNotificationMessage(message);

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  };

  if (user === null) {
    return (
      <div>
        {notificationMessage && <Notification textToDisplay={notificationMessage} />}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>
        Welcome, {user.username}!<ActionButton onClick={() => handleLogout()} buttonText="Logout" />
      </div>

      {/* Add new blog */}
      <div>
        <form onSubmit={writeAttributes}>
          <div>
            Title:
            <input
              type="text"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            URL:
            <input
              type="text"
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>

      {/* Display Blogs */}
      <div>
        <h2>blogs</h2>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>

      {notificationMessage && <Notification textToDisplay={notificationMessage} />}
    </>
  );
};

export default App;