import React, { useState } from 'react';
import Blog from './Blog'

const CreateBlogForm = ({ createBlog, user}) => {
  // Stati per i valori dell'input
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Gestore del submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Nuovo titolo", newTitle);
    console.log("Nuovo autore", newAuthor);
    console.log("Nuovo url", newUrl);

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    };


    createBlog(newBlog, user);

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          name="author"
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          name="url"
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlogForm;
