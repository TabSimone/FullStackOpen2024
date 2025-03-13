// src/pages/User.jsx
import React from 'react';

// Esportiamo un oggetto users
export const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// Componente User che renderizza "Hello World"
const Users = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default Users;
