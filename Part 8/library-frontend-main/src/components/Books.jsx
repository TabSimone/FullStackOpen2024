import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreClicks, setGenreClicks] = useState({}); // Stato per il conteggio dei clic sui generi

  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  let resultGenres = useQuery(ALL_GENRES);

  if (loading || resultGenres.loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;
  const genres = resultGenres.data.allGenres;

  
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    
    setGenreClicks((prev) => {
      const updatedClicks = {
        ...prev,
        [genre]: (prev[genre] || 0) + 1,
      };
  
      // Ricalcola il genere più cliccato
      const mostClickedGenre = Object.entries(updatedClicks).reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        ["", 0]
      );
  
      props.setfavoriteGenre(mostClickedGenre[0]); // Imposta solo il nome del genere
  
      return updatedClicks;
    });
  };
  


  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
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
        <button key={genre} onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
