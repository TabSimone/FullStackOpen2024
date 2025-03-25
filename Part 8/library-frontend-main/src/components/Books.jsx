import { useQuery } from '@apollo/client'; // Apollo dependencies
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_BY_GENRE } from '../queries'
import { useEffect, useState } from 'react';


const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [selectedGenre, setSelectedGenre] = useState(null);

  const { data, loading, error, refetch: refetchBooks } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  let resultGenres = useQuery(ALL_GENRES);
  

  if (loading || resultGenres.loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks
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
