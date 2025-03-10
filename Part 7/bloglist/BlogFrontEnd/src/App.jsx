import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogService';
import ActionButton from './components/Button';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import useUser from './hooks/useUser';
import useBlog from './hooks/useBlog';
import LoginForm from './components/LoginForm';
import { Provider } from 'react-redux';
import store from './store'; // Il tuo store Redux


const App = () => {

  const { user, handleLogin, handleLogout } = useUser();
  const { blogs, writeAttributes, increaseLikes, deleteBlog, setBlogs } = useBlog(user);


  useEffect(() => {
    const loadBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs); // Carica i blog iniziali nel custom hook
    };

    loadBlogs();
  }, [setBlogs]);


  if (user === null) {
    return (
      <div>
        <Provider store={store}>
          <Notification />
        </Provider>
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


      <Provider store={store}>
          <Notification />
        </Provider>

    </>


  );
};

export default App;