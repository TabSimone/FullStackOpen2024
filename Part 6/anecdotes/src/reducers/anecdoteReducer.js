import { createSlice, current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state, action) {
      console.log("Stato CURRENT:" , current(state))
      return state.map(anecdote =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    orderByVoteAction(state) {
      return [...state].sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})





export const { voteAction, orderByVoteAction, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdoteAction = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const upvoteAnecdote = (content) => {
    return async dispatch => {
      console.log("Sono entrato!")
      console.log(content.id)
      console.log(content.votes)
      await anecdotesService.updateVotes(content)
      const anecdotes = await anecdotesService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
    
  
}