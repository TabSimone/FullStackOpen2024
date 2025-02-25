import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async (newAnecdote) => {
  console.log("Sending new anecdote", newAnecdote)  // Log del corpo della richiesta

  try {
    const response = await axios.post(baseUrl, newAnecdote, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log("Response data:", response.data)  // Log della risposta del server
    return response.data
  } catch (error) {
    console.error("Error in POST request:", error.response || error)  // Log dell'errore, se presente
    throw error
  }
}

export const increaseUpvote = async (newAnecdote) => {
}

export const upvoteAnecdote = async (anecdote) => {
  console.log("Upvote anecdote", anecdote.id)  // Log del corpo della richiesta

  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, { votes: anecdote.votes + 1 });
  return response.data;
};

