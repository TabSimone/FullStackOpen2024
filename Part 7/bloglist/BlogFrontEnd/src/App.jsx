import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogService';
import loginService from './services/login';
import ActionButton from './components/Button';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import useUser from './hooks/useUser';


const App = () => {
  
  const { user, handleLogin, handleLogout } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State for notification
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);



  const writeAttributes = async (newBlog) => {

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

  const increaseLikes = async (blogId) => {
    console.log("Entered increase likes");
    console.log(user.token);
    //console.log(blogId)
  
    // Aumenta i "likes"
    await blogService.increaseLikes(blogId, user.token);
  
    // Ottieni tutti i blog e ordina per "likes"
    blogService.getAll().then(blogs => {
      // Ordina i blog in base ai "likes" in ordine decrescente (dal più alto al più basso)
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      
      // Imposta lo stato con i blog ordinati
      setBlogs(sortedBlogs);
    });
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
          createBlog={writeAttributes}
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