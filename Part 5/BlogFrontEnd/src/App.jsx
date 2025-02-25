import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogService';
import loginService from './services/login';
import ActionButton from './components/Button';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';

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
  //State for Blogs details
  const [expandedBlogs, setExpandedBlogs] = useState({});


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


  const handleViewBlogDetails = (id) => {
    console.log('clicked');
  };

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


  const toggleAuthorVisibility = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId], // Inverte la visibilità solo per il blog cliccato
    }));
  };

  const increaseLikes = async (blogId) => {
    console.log("Entered increase likes")
    console.log(user.token)
    //console.log(blogId)
    await blogService.increaseLikes(blogId, user.token);
    blogService.getAll().then(blogs => setBlogs(blogs));
  };

  const deleteBlog = async (blogId) => {
    console.log(user.token)
    console.log(blogId)
    await blogService.deleteBlog(blogId, user.token);
    console.log("sono passato")
    blogService.getAll().then(blogs => setBlogs(blogs));
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
      <div style={{ marginBottom: '20px' }}>
        Welcome, {user.username}!<ActionButton onClick={() => handleLogout()} buttonText="Logout" />
      </div>

      {/* Add new blog */}
      <Togglable buttonLabel="New Blog">
        <CreateBlogForm
          onSubmit={writeAttributes}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          setNewTitle={setNewTitle}
          setNewAuthor={setNewAuthor}
          setNewUrl={setNewUrl}
        />
      </Togglable>


      {/* Display Blogs */}

      <div>
        <h2>BLOGS </h2>

        {blogs.map(blog => (
          <Blog
            key={blog.id}  // Aggiungi una key univoca
            blog={blog}
            expandedBlogs={expandedBlogs}
            toggleAuthorVisibility={toggleAuthorVisibility}
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