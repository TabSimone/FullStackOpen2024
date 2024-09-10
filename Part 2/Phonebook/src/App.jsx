import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContact = { name: newName };

    setNewName('');

    return setPersons([...persons, newContact]);
  };

  const Contacts = () => {

    const contactList = persons.map((item) => <li key = {item.name}>{item.name}</li>)

    return contactList
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:         <input type="text" value={newName}  onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts />

    </div>
  )
}

export default App