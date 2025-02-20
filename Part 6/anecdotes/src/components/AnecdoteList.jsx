import { useSelector, useDispatch } from 'react-redux'
import { voteAction, orderByVoteAction,  upvoteAnecdote} from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer'






const AnecdoteList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdote
    }
    if(state.filter === 'SET_FILTER')
      console.log("Payload attivo:", state.filter);
    return state.anecdote.filter(anecdote =>
      anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase())
    );
  })



  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAction(id))


    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(upvoteAnecdote(anecdote))

    console.log('order vote')
    dispatch(orderByVoteAction())

    console.log('show notification')
    dispatch(showNotification(id));

    setTimeout(() => {
      dispatch(showNotification("")); // Nasconde la notifica dopo 5 sec
    }, 5000);

  }


  return (
    <div >
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
    </div>
  )
}

export default AnecdoteList