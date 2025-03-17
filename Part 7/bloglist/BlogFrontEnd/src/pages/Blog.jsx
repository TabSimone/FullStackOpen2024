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

  const { increaseLikes, deleteBlog, getComments, addComment } = useBlog();

  const [comment, setComment] = useState('');

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(blogId);
        setComments(commentsData || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    if (blogId) {
      fetchComments();
    }

  }, [blogId])


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
      <form onSubmit={async (event) => {
        event.preventDefault();
        await addComment(blogId, comment);
        setComment('');

        const updatedComments = await getComments(blogId);
        setComments(updatedComments || []);
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
      <div>
        <h2>Comments </h2>
        {comments && comments.length > 0 ? (
          comments.map(comment => (
            <li key={comment.id}>
              {comment.text}
            </li>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
