
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeblogs,   } from '../reducers/blogReducer'; 
import  useBlog  from '../hooks/useBlog'; 
import  Togglable  from '../components/Togglable'; 
import  CreateBlogForm  from '../components/CreateBlogForm'; 
import  Blog  from '../components/Blog'; 
import { Link } from 'react-router-dom';  // Assicurati che questa importazione ci sia


// Componente User che renderizza "Hello World"
const Blogs = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { writeAttributes, increaseLikes, deleteBlog, setBlogs } = useBlog(user)
  const blogs = useSelector(state => state.blogs)


  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])

  return (
    <div>
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
    </div>
  );
};

export default Blogs;
