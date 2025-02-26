import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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


test('renders content', () => {
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

  const title = screen.getByText('Blog test title')
  expect(title).toBeDefined()

  const likes = screen.queryByText('Likes')
  expect(likes).toBeNull()
})

test.only('clicking the button shows likes and ', async () => {

  const [expandedBlogs, setExpandedBlogs] = useState({});

    const toggleAuthorVisibility = (id) => {
      setExpandedBlogs((prevExpandedBlogs) => ({
        ...prevExpandedBlogs,
        [id]: !prevExpandedBlogs[id],
      }));
    };

  const mockHandler = vi.fn()

  render(<Blog
    key={blog.id}  // Aggiungi una key univoca
    blog={blog}
    expandedBlogs={blog}
    toggleAuthorVisibility={toggleAuthorVisibility}
    increaseLikes={increaseLikes}
    deleteBlog={deleteBlog}
    user={user}
  />)

  screen.debug()

  const userReal = userEvent.setup()
  const button = screen.getByText('View')
  await userReal.click(button)

  screen.debug()

  const likes = screen.getByText('Likes')
  expect(likes).toBeDefined()


})