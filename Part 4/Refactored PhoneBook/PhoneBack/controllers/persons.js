const personsRouter = require('express').Router()
const Person = require('../models/person')
const express = require('express')

personsRouter.use(express.json())

personsRouter.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/info', (request, response, next) => {
  const requestTime = new Date()
  Person.find({}).then(persons => {
    const count = persons.length
    response.send(`
    <p>Number of persons: ${count}</p>
    <p>Request received at: ${requestTime.toISOString()}</p>
    `)
  }).catch(error => next(error))
})

personsRouter.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

personsRouter.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    phone: body.phone,
    important: body.important || false,

  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

personsRouter.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    phone: body.phone,
    important: body.important
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id!' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'incompatible fields' })
  }


  next(error)
}

personsRouter.use(errorHandler)

module.exports = personsRouter