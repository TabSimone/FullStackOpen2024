import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

const Notification = () => {

  const textToDisplay = useSelector(state => state.notification)

  if (!textToDisplay) {
    return null; // Se notification è vuota, non renderizza nulla
  }

  // Style for the notification
  const notificationStyle = {
    color: 'white',
    backgroundColor: 'red',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={notificationStyle}>
      {textToDisplay}
    </div>
  );
};

export default Notification;