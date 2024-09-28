import { useState  } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'
import React, { useEffect } from 'react';
import contactsService from './services/Contacts'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    if (newMessage) {
      const timeoutId = setTimeout(() => {
        setNewMessage('');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [newMessage]);

  const hook = () => {
    contactsService.getAll().then(response => {
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

    const isDuplicate = persons.some(item => item.name === newName);

    const newContact = { name: newName, phone: newNumber };

    if (!isDuplicate) {
      contactsService.create(newContact).then(response => {
        setPersons([...persons, response.data]); // Use the response data
        setNewName('');
        setNewNumber('');
        setNewMessage(`Added ${newName}`);
      })
        .catch(error => {
          console.error('Error adding contact:', error);
          setNewMessage(`Error adding contact ${newName}`);
          alert('There was an error adding the contact.');
        });
    } else {
      if (window.confirm("Do you really want to update the number?")) {
        const found = persons.find(item => item.name === newName);
        contactsService.update(found.id, newContact).then(response => {
          console.log('Update successful:');
          const newPersons = persons.map(contact =>
            contact.name === newName ? { ...contact, phone: newNumber } : contact
          )
          setPersons(newPersons)
        })
          .catch(error => {
            console.error('Update failed:', error);
            setNewMessage('Failed to remove ${newName}')
          });
      }
      //Alternative is template literals alert(`Hello! This is an alert message for duplicate on: ${newName}`);
      setNewNumber('');
      setNewName('');

    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <>{newMessage && <Notification message={newMessage} />}</>
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
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} />
    </div>
  )
}

export default App