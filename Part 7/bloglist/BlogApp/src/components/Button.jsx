import React from 'react';

const ActionButton = ({ onClick, buttonText }) => {
  // Function to handle button click
  const handleClick = () => {
    onClick()
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
};

export default ActionButton;