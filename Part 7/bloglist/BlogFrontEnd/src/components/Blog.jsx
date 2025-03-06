import React, { useState } from 'react';

const Blog = ({ blog, increaseLikes, deleteBlog, user }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleVisibility = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div>
      {blog.title}
      <br />
      {expanded && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => increaseLikes(blog.id)}>Add like</button>
          
          {blog.author === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>Delete blog</button>
          )}
        </div>
      )}
      <button onClick={toggleVisibility}>
        {expanded ? "Hide" : "View"}
      </button>
    </div>
  );
};

export default Blog;