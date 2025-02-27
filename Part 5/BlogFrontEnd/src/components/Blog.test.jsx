import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
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

const increaseLikes = function() {
  return 1;
};
const deleteBlog = function() {
  console.log("Hello, world!");
};


test('renders content', () => {
  render(<Blog
    key={blog.id}  // Aggiungi una key univoca
    blog={blog}
    expandedBlogs={{}}
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

test('clicking the button shows likes and ', async () => {

  const mockHandler = vi.fn()

  render(<Blog
    key={blog.id}  // Aggiungi una key univoca
    blog={blog}
    increaseLikes={increaseLikes}
    deleteBlog={deleteBlog}
    user={user}
  />)

  screen.debug()

  const userReal = userEvent.setup()
  const button = screen.getByText('View')
  await userReal.click(button)

  screen.debug()

  const likes = screen.getByText('Likes:')
  expect(likes).toBeDefined()


})

test('clicking the likes  ', async () => {

  let numberOfClick = 0

  const increaseLikesMock = vi.fn().mockImplementation(() => {
    numberOfClick++;
    return numberOfClick; // Restituisce il nuovo numero di click
  });

  render(<Blog
    key={blog.id}  // Aggiungi una key univoca
    blog={blog}
    increaseLikes={increaseLikesMock}
    deleteBlog={deleteBlog}
    user={user}
  />)

  screen.debug()

  const userReal = userEvent.setup()
  const button = screen.getByText('View')
  await userReal.click(button)

  const buttonLike = screen.getByText('Add like')
  await userReal.click(buttonLike)
  await userReal.click(buttonLike)

  // Verifica che increaseLikes sia stato chiamato due volte
  expect(increaseLikesMock).toHaveBeenCalledTimes(2);

  // Verifica che il numero di click sia corretto
  expect(numberOfClick).toBe(2);

  
})


test.only('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const toggleVisibility = vi.fn();
  const userReal = userEvent.setup();

  render(<CreateBlogForm toggleVisibility={toggleVisibility} createBlog={createBlog} />);

  const sendButton = screen.getByText('Create');
  const inputTitle = screen.getByLabelText("Title:");
  const inputAuthor = screen.getByLabelText("Author:");
  const inputUrl = screen.getByLabelText("URL:");

  // Digita i valori negli input
  await userReal.type(inputTitle, 'testing a title...');
  await userReal.type(inputAuthor, 'testing a author...');
  await userReal.type(inputUrl, 'testing a url...');
  
  // Clicca sul pulsante per inviare il form
  await userReal.click(sendButton);

  // Verifica che la funzione createBlog sia stata chiamata con i dati corretti
  expect(createBlog).toHaveBeenCalledWith({
    title: 'testing a title...',
    author: 'testing a author...',
    url: 'testing a url...',
  });

  screen.debug(); // Aggiungi questo per visualizzare l'output del DOM
});
