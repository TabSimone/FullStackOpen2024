const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const mongoose = require('mongoose'); 

// GET all blogs
blogsRouter.get('/api/blogs', async (request, response) => {
  logger.info('entered blogRouter');
  const blogs = await Blog.find({});
  return response.json(blogs);
});

// POST a new blog
blogsRouter.post('/api/blogs', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/api/blogs/:title', async (request, response, next) => {

  try {
    const result = await Blog.deleteOne({ title: request.params.title })
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }

});

// PATCH (update) a blog by title
blogsRouter.patch('/api/blogs/:title', async (request, response, next) => {
  try {
    const title = request.params.title; 

    const { author, likes, url } = request.body;

    const updatedBlog = await Blog.findOneAndUpdate(
      { title }, 
      { $set: { author, likes, url } }, 
      { new: true, runValidators: true } 
    );

    if (!updatedBlog) {
      return response.status(404).json({ message: 'Blog not found' });
    }

    return response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;