const Contacts = ({ persons, newFilter }) => {
  const filteredContacts = persons
    .filter(person => newFilter === '' || person.name.startsWith(newFilter))
    .map(person => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ));

  return <ul>{filteredContacts}</ul>;
};

export default Contacts