import React from 'react';
import '../index.css'

const Notification = ({ message }) => {
  return (
    <div className= 'notification' >
    Added: {message}
  </div>
  );
};

export default Notification;