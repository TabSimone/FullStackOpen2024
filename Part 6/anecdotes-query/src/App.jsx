import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, upvoteAnecdote } from './services/requests'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import NotificationContext  from './contexts/NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(NotificationContext)
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const mutation = useMutation({
    mutationFn: upvoteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  });

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError  ) {
    return <div>Unable to connect...</div>
  }

  const anecdotes = result.data


  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)

    const text = "anecdote " + anecdote.content + " upvoted"

    dispatch({ type: "UPVOTE", text: text });

    mutation.mutate(anecdote); 


  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
