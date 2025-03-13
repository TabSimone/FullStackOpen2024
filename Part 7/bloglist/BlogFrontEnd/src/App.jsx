import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useSelector, useDispatch } from 'react-redux'
import { checkUser } from './reducers/userReducer';
import Navbar from './components/Navbar';

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Notification />
    </div>

  )
}

export default App;