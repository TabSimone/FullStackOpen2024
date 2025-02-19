import { useSelector } from 'react-redux'


const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null; // Se notification è vuota, non renderizza nulla
  }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      Hai votato: {notification}
    </div>
  )
}

export default Notification;