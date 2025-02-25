import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const user = {
    id : "012",
    passwordHash: "uidsnviusadnfviuenawrpivnu",
    name: "etes",
    username: "username_test"
  }

  const blog = {
    id : "01",
    title: "Blog test title",
    author: "Author Author",
    url: "http://example.com/a-",
    username: "username_test"
  }

  const toggleAuthorVisibility = function() {
    console.log("Hello, world!");
  };
  const increaseLikes = function() {
    console.log("Hello, world!");
  };
  const deleteBlog = function() {
    console.log("Hello, world!");
  };

  render(<Blog
    key={blog.id}  // Aggiungi una key univoca
    blog={blog}
    expandedBlogs={{}}
    toggleAuthorVisibility={toggleAuthorVisibility}
    increaseLikes={increaseLikes}
    deleteBlog={deleteBlog}
    user={user}
  />)

  screen.debug()

  const element = screen.getByText('Blog test title')
  expect(element).toBeDefined()
})