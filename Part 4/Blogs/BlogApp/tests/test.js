
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { blogs } = require('./test_arguments')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { describe, test, after, beforeEach } = require('node:test')
const axios = require('axios');


const api = supertest(app)


beforeEach(async () => {

  await Blog.deleteMany({})

  await User.deleteMany({})

})


describe('4.8-4.12', () => {

  test('does blogs have id', async () => {

    const response = await api
      .get('/api/blogs')

    const blogsArray = response.body.map(blogData => new Blog(blogData));

    const allHaveId = blogsArray.every(blog => blog.id);

    assert.strictEqual(allHaveId, true)
  })

  test('does it increase by one with post', async () => {

    const responseBefore = await api
      .get('/api/blogs')

    const lengthBeforePost = responseBefore.body.length

    //I make the post call
    const response = await api
      .post('/api/blogs').send({ // Send the data as an object
        title: 'Title blog',
        author: 'Athour',
        url: 'https://example.com/new-blog-post',
        likes: 4
      })

    const responseAfter = await api
      .get('/api/blogs')

    const lengthAfterPost = responseAfter.body.length

    assert.strictEqual(lengthBeforePost + 1, lengthAfterPost)
  })

  test('does it save likes as zero', async () => {

    //I make the post call
    const response = await api
      .post('/api/blogs').send({ // Send the data as an object
        title: 'Title blog',
        author: 'Zero likes',
        url: 'https://example.com/new-blog-post',
      })

    const responseAfter = await api
      .get('/api/blogs')

    const blogsArray = responseAfter.body.map(blogData => new Blog(blogData));

    const check = blogsArray.some(blog => blog.author === "Zero likes" && blog.likes === 0);

    assert.strictEqual(check, true)
  })

  test('no url no save', async () => {

    const response = await api
      .post('/api/blogs').send({ // Send the data as an object
        url: 'https://example.com/new-blog-post',
        likes: 4
      })

    assert.strictEqual(response.status, 400)
  })

})

describe('4.13-4.14', () => {

  test('does delete function works', async () => {

    const responseBefore = await api

      .get('/api/blogs')

    const lengthBeforePost = responseBefore.body.length

    const title = encodeURIComponent("React patterns");

    await api.delete(`/api/blogs/${title}`);

    const responseAfter = await api
      .get('/api/blogs')

    const lengthAfterPost = responseAfter.body.length

    assert.strictEqual(lengthBeforePost, lengthAfterPost + 1)
  })

  test
    ('does update works', async () => {

      const title = encodeURIComponent("React patterns");

      //I make the post call
      const response = await api
        .patch(`/api/blogs/${title}`).send({ // Send the data as an object
          author: 'Nuovo autore',
          url: 'https://example.com/new-blog-post',
          likes: 1
        })

      assert.strictEqual(response.body.author, "Nuovo autore")
    })

})

describe.only('4.23', () => {

  test.only('does post new blog wors', async () => {

    const makeUser = await api
      .post('/api/users').send({ // Send the data as an object
        username: 'test2',
        name: 'name test',
        password: 'test1234'
      })

    const loginUser = await api
      .post('/api/login').send({ // Send the data as an object
        username: 'test2',
        password: 'test1234'
      })

    const token = loginUser.body.token

    console.log(token)
    console.log("------------->")
    
    
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test 4.23',
        author: 'Author',
        url: 'https://example.com/new-blog-post',
        likes: 4
      });

    console.log(response);


  })
})


after(async () => {
  // Close the Mongoose connection
  await mongoose.connection.close();
})