import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import LogoutForm from "./components/Logout";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");

  const [token, setToken] = useState(null)

  const [favoriteGenre, setfavoriteGenre] = useState(null)

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
