const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

// GET all blogs
blogsRouter.get('/api/blogs', async (request, response, next) => {

  try {
    const blogs = await Blog.find({});
    const users = await User.find({});

    const blogsWithUsers = blogs.map(blog => {
      const user = users.find(user => user.username === blog.username);
      return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id,
        user: { username: user.username, name: user.name }
      };
    });

    return response.json(blogsWithUsers);
  } catch (error) {
    next(error);
  }
});

// POST a new blog
blogsRouter.post('/api/blogs', async (request, response, next) => {

  try {
    const blog = new Blog(request.body);
    //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    blog.username = user.username

    const result = await blog.save()
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/api/blogs/:title', async (request, response, next) => {
  const title = request.params.title;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'user not found' });
  }

  const blog = await Blog.findOne({ 'title': title, 'username': user.username });

  if (!blog) {
    return response.status(404).json({ error: 'blog not found or user does not have permission' });
  }

  try {
    const result = await Blog.deleteOne({ _id: blog._id });

    // Check if a document was deleted
    if (result.deletedCount === 0) {
      return response.status(404).json({ error: 'blog not found during deletion' });
    }
    
    response.status(204).end(); // No content to send back
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
  

});

module.exports = blogsRouter