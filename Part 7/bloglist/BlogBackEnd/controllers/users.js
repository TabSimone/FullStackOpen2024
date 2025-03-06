const usersRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Custom error class
class CredentialsError extends Error {
  constructor(message) {
      super(message);
      this.name = "CredentialsError"; // Custom error name
  }
}
// GET all users
usersRouter.get('/api/users', async (request, response) => {
  logger.info('entered blogRouter');
  const users = await User.find({});
  // Fetch all blogs with a specific username
  const blogs = await Blog.find({ });

  // Combine users and their blogs in a structured format
  const usersWithBlogs = users.map(user => ({
      username: user.username,
      name: user.name,
      blogs: blogs.filter(blog => blog.username === user.username) // Filter blogs for each user
  }));
  return response.json(usersWithBlogs);
});

// POST user / sign in user
usersRouter.post('/api/users', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (username.length < 4 || password.length < 4) {
      throw new CredentialsError("Credentials must be at least 4 characters long.")
    }


    // Check uniqueness directly from the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new CredentialsError("Username already exists.");
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const result = await user.save();
    return response.status(201).json(result);



  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;