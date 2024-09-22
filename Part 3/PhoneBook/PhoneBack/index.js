const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const Person = require('./models/person')

app.use(cors())
app.use(express.json())

const args = process.argv.slice(3); 

const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));
// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const requestTime = new Date();
  const length = persons.length; 
  response.send(`
    <p>Number of persons: ${length}</p>
    <p>Request received at: ${requestTime.toISOString()}</p>
  `);
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.phone === undefined) {
    return response.status(400).json({ error: 'Missing content' }); 
  }


  const person = new Person({
    name: body.name,
    phone: body.phone,
    important: body.important || false,

  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
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

  next(error)
}

app.use(errorHandler)

/*
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})