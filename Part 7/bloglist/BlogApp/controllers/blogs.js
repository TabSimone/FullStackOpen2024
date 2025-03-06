const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

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
blogsRouter.post('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    
    // The user is extracted by the tokenExtractor middleware
    const user = request.user;
    blog.username = user.username;

    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


//DELETE A BLOG
blogsRouter.delete('/api/blogs/:id', middleware.tokenExtractor, async (req, res) => {
  try {
      const { id } = req.params;

      // Trova il blog nel database
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ error: 'Blog non trovato' });

      const result = await Blog.deleteOne({ _id: blog._id });

      // Restituisce il documento aggiornato come risposta
      return res.status(201).json(result);
      
  } catch (error) {
      res.status(500).json({ error: 'Errore durante l\'aggiornamento' });
  }
});

// INCREASE likes of a blog
blogsRouter.put('/api/blogs/:id', middleware.tokenExtractor, async (req, res) => {
  try {
      const { id } = req.params;

      // Trova il blog nel database
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ error: 'Blog non trovato' });

      // Incrementa i like di 1
      blog.likes += 1;

      // Salva il documento aggiornato
      const updatedBlog = await blog.save();

      // Restituisce il documento aggiornato come risposta
      res.json(updatedBlog);
      
  } catch (error) {
      res.status(500).json({ error: 'Errore durante l\'aggiornamento' });
  }
});



module.exports = blogsRouter;