import { useState } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import React, { useEffect } from 'react';
import contactsService from './services/Contacts'


const App = () => {
  const [persons, setPersons] = useState([

  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])


  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let counter = 0

    persons.forEach(function (item) {
      if (item.name === newName) {
        counter++;
      }
    })

    if (counter == 0) {
      console.log('There are no duplicates');

      persons.map((item) => <li key={item.name}>{item.name}</li>)

      const newContact = { name: newName, number: newNumber };

      contactsService.create({ newContact })

      setNewName('');
      setNewNumber('');

      return setPersons([...persons, newContact]);

    } else {
      alert('Hello! This is an alert message for duplicate on: ' + newName);
      //Alternative is template literals alert(`Hello! This is an alert message for duplicate on: ${newName}`);
      setNewNumber('');
      setNewName('');

    }
  };


  return (
    <div>
      <h2>Filter</h2>
      <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
      <h2>Add New Contact</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />

    </div>
  )
}

export default App