// src/pages/User.jsx
import React from 'react';


// Componente User che renderizza "Hello World"
const Blogs = () => {
  const dispatch = useDispatch();
  const { writeAttributes, increaseLikes, deleteBlog, setBlogs } = useBlog(user);
  const blogs = useSelector(state => state.blogs)

  
  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])

  return (
    <div>
      {/* Add new blog */}
      <Togglable buttonLabel="New Blog">
        <CreateBlogForm
          createBlog={writeAttributes}
        />
      </Togglable>

      <div>
        <h2>BLOGS </h2>
        {blogs.map(blog => (
          <Blog
            key={blog.id}  // Aggiungi una key univoca
            blog={blog}
            increaseLikes={increaseLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
