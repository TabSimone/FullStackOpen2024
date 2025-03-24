import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client'; // Apollo dependencies
import { EDIT_YEAR, ALL_AUTHORS } from '../queries'



const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editYear] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error(error)
    }
  })


  let result = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()

    console.log('changing year...')

    const yearToInt = parseInt(year, 10)

    editYear({ variables: { name, setBornTo: yearToInt } })

    setName('')
    setYear('')
  }



  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born || 'Unknown'}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      {props.token && (
        <div>
          <form onSubmit={submit}>
            <div>
              <select onChange={(event) => setName(event.target.value)}>
                {authors.map((author) => (
                  <option value={author.name} key={author.id} >{author.name}</option>
                ))}
              </select>
            </div>
            <div>
              name
              <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div>
              year
              <input
                type="number"
                value={year}
                onChange={({ target }) => setYear(target.value)}
              />
            </div>
            <button type="submit">edit year</button>
          </form>
        </div>
      )}
    </div>

  );
};

export default Authors;
