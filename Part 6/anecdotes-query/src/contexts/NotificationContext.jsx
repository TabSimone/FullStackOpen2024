import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';


// Reducer che gestisce lo stato
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "UPVOTE":
      console.log("UPVOTE")
      return { ...state, text: action.text };
    case "ERROR_HANDLING":
      console.log("ERROR_HANDLING")
      return { ...state, text: action.text };
    case "NOTHING":
      console.log("NOTHING")
      return  { ...state, text: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

// Provider che fornisce lo stato del contesto
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { text: '' })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children} {/* Qui viene usato 'children' */}
    </NotificationContext.Provider>
  );
};

// Definizione dei propTypes
NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Definiamo che 'children' deve essere un nodo valido di React
};

export default NotificationContext;
