const LogoutForm = (props) => {


  const submit = async (event) => {
    event.preventDefault()

    props.setToken(null);

    props.setPage("authors")
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h2> Logout </h2>
        <button type='submit'>logout</button>
      </form>
    </div>
  )
}

export default LogoutForm