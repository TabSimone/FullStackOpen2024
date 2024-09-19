import React from 'react';

const PersonForm = ({ newName, newNumber, handleChangeName, handleChangeNumber, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input type="text" value={newName} onChange={handleChangeName} />
      </div>
      <div>
        Number: <input type="text" value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;