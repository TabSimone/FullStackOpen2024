
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeblogs,   } from '../reducers/blogReducer'; 
import  Togglable  from '../components/Togglable'; 
import  CreateBlogForm  from '../components/CreateBlogForm'; 
import { Link } from 'react-router-dom';  

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)


  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])

  return (
    <div>
      {/* Add new blog */}
      <Togglable buttonLabel="New Blog">
        <CreateBlogForm
        />
      </Togglable>

      <div>
        <h2>BLOGS </h2>
        {blogs.map(blog => (
          <li key={blog.id}>
          <Link to={`/blogs/${encodeURIComponent(blog.id)}`}>{blog.title} </Link>
       </li>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

