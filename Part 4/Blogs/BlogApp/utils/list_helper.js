const Blog = require('../utils/list_helper')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blog) => {
    return blog[0].likes
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((max, blog) => {
        return blog.likes > max ? blog.likes : max;
    }, 0); 

    return maxLikes
}

const mostBlogs = (blogs) => {
    const authorCount = {};

    // Count occurrences of each author
    blogs.forEach(blog => {
      authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
    });

    // Find the author with the most blogs
    let maxBlogs = 0;
    let mostProlificAuthor = '';

    for (const author in authorCount) {
        if (authorCount[author] > maxBlogs) {
            maxBlogs = authorCount[author];
            mostProlificAuthor = author;
        }
    }

    return { author: mostProlificAuthor, blogs: maxBlogs };

}

const mostLikes = (blogs) => {
    const likesCount = {};

    // Count occurrences of each author
    blogs.forEach(blog => {
        likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes;
    });

    // Find the author with the most blogs
    let maxLikes = 0;
    let mostProlificAuthor = '';

    for (const author in likesCount) {
        if (likesCount[author] > maxLikes) {
            maxLikes = likesCount[author];
            mostProlificAuthor = author;
        }
    }

    return { author: mostProlificAuthor, likes: maxLikes };

}
  
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }