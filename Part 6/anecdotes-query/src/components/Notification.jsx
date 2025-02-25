import { useContext, useEffect } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  useEffect(() => {
    if (!notification.text) return;

    const timer = setTimeout(() => {
      dispatch({ type: "NOTHING" });
    }, 5000);

    return () => clearTimeout(timer); // Pulisce il timeout se la notifica cambia prima dei 5 secondi
  }, [notification.text, dispatch]); 

  if (!notification.text) return null;

  return <div style={style}>{notification.text}</div>;
};

export default Notification;
