import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from '../queries';
import { useState, useEffect } from 'react';

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreClicks, setGenreClicks] = useState({});
  const [books, setBooks] = useState([]); // Stato locale per i libri

  const { data, loading, error, refetch, subscribeToMore } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  let resultGenres = useQuery(ALL_GENRES);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: BOOK_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newBook = subscriptionData.data.bookAdded;
        
        // Verifica che il libro appartenga al genere selezionato (o nessun genere selezionato)
        if (!selectedGenre || newBook.genres.includes(selectedGenre)) {
          return {
            allBooks: [...prev.allBooks, newBook],
          };
        }
        return prev;
      },
    });

    return () => unsubscribe();
  }, [selectedGenre, subscribeToMore]);

  if (loading || resultGenres.loading) {
    return <div>loading...</div>;
  }

  const genres = resultGenres.data.allGenres;

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    refetch();
    
    setGenreClicks((prev) => {
      const updatedClicks = {
        ...prev,
        [genre]: (prev[genre] || 0) + 1,
      };
  
      const mostClickedGenre = Object.entries(updatedClicks).reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        ["", 0]
      );
  
      props.setfavoriteGenre(mostClickedGenre[0]);
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