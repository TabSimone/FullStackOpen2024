import contactsService from '../services/Contacts'
import React, { useEffect } from 'react';

const deleteContact = (id, setPersons, persons) => {
  if (window.confirm("Do you really want to delete?")) {
  console.log('Ive deleted that')
  contactsService.delete(id).then(response => {
    const filteredPersons = persons.filter(user => user.id != id);
    setPersons(filteredPersons)
    console.error('Done!' + id);
  })
    .catch(error => {
      console.error('Error adding contact:', error);
    });
  }
}

const Contacts = ({ persons, newFilter, setPersons }) => {
  const filteredContacts = persons
    .filter(person => newFilter === '' || person.name.startsWith(newFilter))
    .map(person => (
      <li key={person.id}>
        {person.name} {person.number}
        <br></br>
        <button onClick={() => deleteContact(person.id, setPersons, persons)}>
          Delete
        </button>
      </li>
    ));

  return <ul>{filteredContacts}</ul>;
};

export default Contacts