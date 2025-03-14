import blogService from '../services/blogService';
import { useSelector, useDispatch } from 'react-redux';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import { appendblog, setBlogs } from '../reducers/blogReducer';

const useBlog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector((state) => state.user);

  const writeAttributes = async (newBlog) => {
    try {
      console.log('sono entrato');
      console.log(user.token);
      console.log(' ho scritto user token');
      
      await blogService.create(newBlog, user.token);
      console.log('Entered writeAttributes!');

      dispatch(showNotificationWithTimeout({ message: 'Blog created successfully', time: 2 }));
      
      dispatch(appendblog(newBlog)); 

    } catch (error) {
      console.error('Error creating blog:', error.response ? error.response.data : error.message);
      dispatch(showNotificationWithTimeout({ message: 'Failed to create blog. Please try again', time: 2 }));
    }
  };

  const increaseLikes = async (blogId) => {
    console.log("Entered increase likes");
    console.log(user.token);

    await blogService.increaseLikes(blogId, user.token);

    // Ottieni tutti i blog e ordina per "likes"
    const updatedBlogs = await blogService.getAll();
    const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);

    // 🚀 Aggiorna Redux con i blog ordinati
    dispatch(setBlogs(sortedBlogs));
  };

  const deleteBlog = async (blogId) => {
    console.log(user.token);
    console.log(blogId);

    await blogService.deleteBlog(blogId, user.token);
    console.log("Blog eliminato con successo!");

    const updatedBlogs = await blogService.getAll();
    dispatch(setBlogs(updatedBlogs));
  };

  return {
    blogs, writeAttributes, increaseLikes, deleteBlog
  };
};

export default useBlog;
