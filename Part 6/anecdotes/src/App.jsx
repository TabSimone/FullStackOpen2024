import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      payload: id
    })

    console.log('order vote')
    dispatch({
      type: 'ORDER_BY_VOTE',
    })
  }

  const newAnecdote = (event) => {
    event.preventDefault();
    // Usa direttamente event.target per accedere al form
    const content = event.target.anecdoteText.value;
    console.log('new anecdote', content);
    
     dispatch({
       type: 'NEW_ANECDOTE',
      payload: content
     })
    
    event.target.anecdoteText.value = '';
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      {/* Importante: aggiungi onSubmit al form invece di onClick al button */}
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdoteText" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App