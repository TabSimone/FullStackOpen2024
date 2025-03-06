const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')


mongoose.set('strictQuery', false)

logger.info('connecting to ....', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor); 

// Route handlers
app.use(blogsRouter)
app.use(usersRouter)
app.use('/api/login', loginRouter)

//Testing mode for e2e testing
if (process.env.NODE_ENV === 'test') {
  logger.info('entered test...let s use controllers/testing');
  const testingRouter = require('./controllers/testing');
  console.log('Registering /api/testing route');
  app.use('/api/testing', testingRouter);
}


// Error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app