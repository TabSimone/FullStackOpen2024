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
import { initializeblogs} from './reducers/blogReducer';
import { useSelector, useDispatch } from 'react-redux'


const App = () => {

  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs)

  // Inizializza i blog quando il componente viene montato
  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])


  const { user, handleLogin, handleLogout } = useUser();
  const { writeAttributes, increaseLikes, deleteBlog, setBlogs } = useBlog(user);



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