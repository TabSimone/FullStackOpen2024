import blogService from '../services/blogService';
import { useState, useEffect } from 'react';





const useBlog = (showNotification, user) => {

  const writeAttributes = async (newBlog) => {

    try {
      console.log(user.token)
      await blogService.create(newBlog, user.token);
      console.log('Entered writeAttributes!');

      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');

      showNotification('Blog created successfully!');
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error creating blog:', error.response ? error.response.data : error.message);
      showNotification('Failed to create blog. Please try again.');
    }
  };

  const increaseLikes = async (blogId) => {
    console.log("Entered increase likes");
    console.log(user.token);
    //console.log(blogId)

    // Aumenta i "likes"
    await blogService.increaseLikes(blogId, user.token);

    // Ottieni tutti i blog e ordina per "likes"
    blogService.getAll().then(blogs => {
      // Ordina i blog in base ai "likes" in ordine decrescente (dal più alto al più basso)
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

      // Imposta lo stato con i blog ordinati
      setBlogs(sortedBlogs);
    });
  };

  const deleteBlog = async (blogId) => {
    console.log(user.token)
    console.log(blogId)
    await blogService.deleteBlog(blogId, user.token);
    console.log("sono passato")
    blogService.getAll().then(blogs => setBlogs(blogs));
  };



  return {
    writeAttributes, increaseLikes, deleteBlog
  }
}



export default useBlog