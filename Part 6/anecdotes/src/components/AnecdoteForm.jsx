import {  useDispatch } from 'react-redux'
import {  newAnecdoteAction } from '../reducers/anecdoteReducer';


const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    // Usa direttamente event.target per accedere al form
    const content = event.target.anecdoteText.value;
    console.log('new anecdote', content);

    dispatch(newAnecdoteAction(content))

    event.target.anecdoteText.value = '';
  }

  return (
    <div>
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

export default AnecdoteForm