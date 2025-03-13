import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeblogs } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const User = () => {
  const dispatch = useDispatch();

  const authorName = useParams().id

  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const authorBlogs = blogs.filter(blog => blog.author === authorName);

  console.log(authorName)

  return (
    <div>
      <h2>Single author</h2>
      <div>
        <h1>Blogs by {authorName}</h1>
        {authorBlogs.length === 0 ? (
          <p>No blogs found for this author.</p>
        ) : (
          <ul>
            {authorBlogs.map(blog => (
              <li key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default User;
