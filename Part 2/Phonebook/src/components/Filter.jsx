import React from 'react';

const Filter = ({ newFilter, handleChangeFilter }) => {
  return (
    <div>
      Filter: <input type="text" value={newFilter} onChange={handleChangeFilter} />
    </div>
  );
};

export default Filter;