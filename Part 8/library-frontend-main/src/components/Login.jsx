import { useState } from 'react'
//import { useMutation  } from '@apollo/client'; // Apollo dependencies
//import { CREATE_BOOK } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //const [ createBook ] = useMutation(CREATE_BOOK)


  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    /*
    const publishedToInt = parseInt(published, 10)

    createBook({  variables: { title, publishedToInt , author, genres } })



    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')*/
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">nmake login</button>
      </form>
    </div>
  )
}

export default Login