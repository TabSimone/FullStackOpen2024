import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query {
    allBooks {
      title
      published
      author {
      name
      }
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genres: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int, $author: String, $genres: [String]) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
  }
}
`;

export const EDIT_YEAR = gql`
mutation editYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`