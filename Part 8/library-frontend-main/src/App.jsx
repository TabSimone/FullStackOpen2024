import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import LogoutForm from "./components/Logout";
import Recommended from "./components/Recommended";
import {  useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from "./queries";



const App = () => {
  const [page, setPage] = useState("authors");

  const [token, setToken] = useState(null)

  const [favoriteGenre, setfavoriteGenre] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])
  

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("logout")}>logout</button>}
        <button onClick={() => setPage("recommended")}>recommended</button>
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books" } setfavoriteGenre = {setfavoriteGenre} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken = {setToken}  setPage = {setPage}/>

      <LogoutForm show={page === "logout"} setToken = {setToken} setPage = {setPage} />

      <Recommended show={page === "recommended"} favoriteGenre = {favoriteGenre} />

    </div>
  );
};

export default App;
