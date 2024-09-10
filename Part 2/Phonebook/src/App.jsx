import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    const contactList = persons
      .filter(item => newFilter === '' || item.name.startsWith(newFilter))
      .map(item => (
        <li key={item.name}>
          {item.name} {item.number}
        </li>
      ));
  
    return <ul>{contactList}</ul>;
  };


  return (
    <div>
      <h2>Filter</h2>
      <form onSubmit={handleSubmit}>
        <div>filter show on: <input type="text" value={newFilter} onChange={handleChangeFilter} /></div>
        <div>
        </div>
      </form>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>number: <input type="text" value={newNumber} onChange={handleChangeNumber} /></div>
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