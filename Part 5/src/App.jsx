import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ActionButton from './components/Button'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      console.log('Correct credential')
    } catch (exception) {
      alert('Incorrect credential')
      console.log('Incorrect credential')
    }
  }
  
    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
        </div>
      )
    }
  
    return (
      <><div>
        <h2>Welcome, {user.username}!</h2><ActionButton onClick={() => setUser(null)} buttonText="Logout"         /> 
      </div><div>
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />
          )}
        </div></>
    )
  }



export default App