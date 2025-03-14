import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { initializeblogs, addComment } from '../reducers/blogReducer';
import useBlog from '../hooks/useBlog';
import { useParams } from 'react-router-dom';


const Blog = () => {
  const dispatch = useDispatch();

  const blogId = useParams().id

  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blog = blogs.find(blog => blog.id === blogId);

  const { increaseLikes, deleteBlog, addComment } = useBlog();

  const [comment, setComment] = useState('');

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div>
      <h2>Single Blog</h2>
      <div>
        {blog.title}
        <br />
        <div>
          <p>Author: {blog.author}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => increaseLikes(blog.id)}>Add like</button>
          {blog.author === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>Delete blog</button>
          )}
        </div>
      </div>
      <br />
      <form onSubmit={(event) => {
        event.preventDefault(); 
        addComment(blog.id, comment);
        setComment(''); 
      }}>
        <div>
          <input
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default Blog;
