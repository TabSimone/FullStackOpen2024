import NotificationContext  from '../contexts/NotificationContext'
import { useContext } from 'react'


const Notification = () => {
  const [notification] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.text) return null;

  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification
