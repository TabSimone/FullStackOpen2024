import { createSlice, current } from '@reduxjs/toolkit'
import blogsService from '../services/blogService';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendblog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})





export const { voteAction, orderByVoteAction, appendblog, setBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const newblogAction = (content) => {
  return async dispatch => {
    const newblog = await blogsService.create(content)
    dispatch(appendblog(newblog))
  }
}

export const upvoteblog = (content) => {
    return async dispatch => {
      console.log("Sono entrato!")
      console.log(content.id)
      console.log(content.votes)
      await blogsService.updateVotes(content)
      const blogs = await blogsService.getAll()
      dispatch(setBlogs(blogs))
    }
    
  
}