const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const personsRouter = require('./controllers/persons')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')



mongoose.set('strictQuery',false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })




app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(personsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)


module.exports = app