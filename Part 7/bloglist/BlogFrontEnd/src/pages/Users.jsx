import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeblogs  } from '../reducers/blogReducer'; 

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const authorCount = blogs.reduce((acc, blog) => {
    // Se l'autore esiste già nell'oggetto, incrementa il contatore, altrimenti inizializza a 1
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});


    return (
    <div>
      <h2>Author Blog Counts</h2>
      <ul>
        {Object.entries(authorCount).map(([author, count]) => (
          <li key={author}>
            {author}: {count} {count === 1 ? 'Blog' : 'Blogs'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
