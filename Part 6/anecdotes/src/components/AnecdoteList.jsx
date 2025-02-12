import { useSelector, useDispatch } from 'react-redux'
import { voteAction, orderByVoteAction } from '../reducers/anecdoteReducer';






const AnecdoteList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAction(id))

    console.log('order vote')
    dispatch(orderByVoteAction())

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