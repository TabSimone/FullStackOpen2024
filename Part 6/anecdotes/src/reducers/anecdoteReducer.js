import { createSlice, current } from '@reduxjs/toolkit'

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
    newAnecdoteAction(state, action) {
      state.push(action.payload) 
    }
    ,
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





export const { voteAction, orderByVoteAction, newAnecdoteAction, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
