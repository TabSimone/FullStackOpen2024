import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes,  initializeAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'



const App = () => {
  const dispatch = useDispatch()
  dispatch(setAnecdotes)
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, ) 

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App