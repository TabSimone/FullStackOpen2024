const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { blogs }  = require('./test_arguments')


describe('4.3-4.4', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    
    test('dummy returns one', () => {
        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
      })

      
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

  })


  describe('4.5-4.6-4.7', () => {
      
    test('which blog has the most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result, 1000)
    })

    test('which author has most blogs', () => {
      const result = listHelper.mostBlogs(blogs);
      assert.strictEqual(result.blogs, 6); // This should pass now
    })

    test('which author has most likes', () => {
      const result = listHelper.mostLikes(blogs);
      assert.strictEqual(result.author, "Robert C. Martin"); // This should pass now
    })

  })