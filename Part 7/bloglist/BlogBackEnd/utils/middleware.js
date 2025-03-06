const logger = require('./logger')
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7); // Extracts the token part
  } else {
    request.token = null; // No token found
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    next()
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);
    
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ error: 'token verification failed' });
  }
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CredentialsError') {
    return response.status(400).json({ error: error.message }); 
  }


  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}