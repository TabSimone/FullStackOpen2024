// Blog.js
import React from 'react';

const Blog = ({ blog, expandedBlogs, toggleAuthorVisibility, increaseLikes, deleteBlog, user }) => {
  return (
    <div key={blog.id}>
      {blog.title}
      <br />
      {expandedBlogs[blog.id] && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => increaseLikes(blog.id)}>Add like</button>
          
          {/* Mostra il bottone solo se il blog ha più di 10 likes */}
          {blog.author === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>Delete blog</button>
          )}
        </div>
      )}
      <button onClick={() => toggleAuthorVisibility(blog.id)}>
        {expandedBlogs[blog.id] ? "Hide" : "View"}
      </button>
    </div>
  );
};

export default Blog;
