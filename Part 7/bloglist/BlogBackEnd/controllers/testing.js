const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger');
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  logger.info('entered Reset');
  
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter