import { useQuery } from '@apollo/client'; // Apollo dependencies
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useEffect, useState } from 'react';


const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    console.log(selectedGenre);
  }, [selectedGenre]);

  let result = useQuery(ALL_BOOKS)
  let resultGenres = useQuery(ALL_GENRES);

  if (result.loading || resultGenres.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = resultGenres.data.allGenres

  return (
    <div>
      <h2>bookss</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Genres</h3>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)} 
        >
          {genre}
        </button>
      ))}



    </div>
  )
}

export default Books
