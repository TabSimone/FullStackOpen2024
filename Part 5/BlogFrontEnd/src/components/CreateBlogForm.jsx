const CreateBlogForm = ({ newTitle, newAuthor, newUrl, setNewTitle, setNewAuthor, setNewUrl, toggleVisibility }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("sono entrato in handle Submit")
    toggleVisibility()
  };
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}

        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}

        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}

        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
  )
}

export default CreateBlogForm;

