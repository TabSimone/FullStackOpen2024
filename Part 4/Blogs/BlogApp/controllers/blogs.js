const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


//JWT TOOLS
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// GET all blogs
blogsRouter.get('/api/blogs', async (request, response,next) => {
  logger.info('Entered blogRouter');

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
        user:  { username: user.username, name: user.name } 
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
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    console.log(decodedToken)
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