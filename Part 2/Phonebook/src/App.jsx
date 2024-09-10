import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number : '12341434'
     }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeName= (event) => {
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

  const Contacts = () => {

    const contactList = persons.map((item) => <li key={item.name}>{item.name} {item.number}</li>)

    return contactList

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
      <div>number: <input  type="text" value={newNumber} onChange={handleChangeNumber} /></div> 
        <div>
          name:         <input type="text" value={newName} onChange={handleChangeName} />
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