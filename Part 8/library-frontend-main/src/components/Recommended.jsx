import { useQuery } from '@apollo/client'; // Apollo dependencies
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react';


const Recommended = (props) => {
  if (!props.show) {
    return null
  }

  console.log("Il genre preferito è...", props.favoriteGenre )

  const { data, loading, error, refetch: refetchBooks } = useQuery(ALL_BOOKS, {
    variables: { genre: props.favoriteGenre },
  });
  

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks

  return (
    <div>
      <h2>Recommended</h2>
      <h4>{props.favoriteGenre ? props.favoriteGenre : "No preferiti"}</h4>
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



    </div>
  )
}

export default Recommended
