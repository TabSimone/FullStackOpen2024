import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests';
import NotificationContext  from '../contexts/NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData ? oldData.concat(newAnecdote) : [newAnecdote];
      });
    },
    onError: (error) => {
      dispatch({ type: "ERROR_HANDLING", text: `Error: ${error.message || 'Failed to create anecdote'}` });
    console.log(error);

    },
  });
  

  const onCreate = (event) => {
    
    event.preventDefault()
    const content = event.target.anecdote.value 
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
   

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
