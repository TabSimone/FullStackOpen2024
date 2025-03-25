import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook, { loading, error }] = useMutation(CREATE_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log('Submitting book...');

    // Convalida il titolo
    if (title.length < 5) {
      console.error('Title must be at least 5 characters long');
      return;
    }

    // Converti "published" in un numero intero
    const publishedToInt = parseInt(published, 10);
    if (isNaN(publishedToInt)) {
      console.error('Invalid published year');
      return;
    }

    try {
      await createBook({
        variables: {
          title,
          published: publishedToInt,
          author,
          genres: genres || [], // Usa un array vuoto se genres è undefined
        },
      });

      console.log('Book created successfully');

      // Resetta i campi del form
      setTitle('');
      setPublished('');
      setAuthor('');
      setGenres([]);
      setGenre('');
    } catch (err) {
      console.error('Error creating book:', err.message);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published:
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          Genre:
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(', ')}</div>
        <button type="submit">Create book</button>
      </form>

      {/* Mostra eventuali errori */}
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default NewBook;