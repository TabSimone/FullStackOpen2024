const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid');
const { GraphQLError } = require('graphql');



const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

const Author = require('./models/author')
const Book = require('./models/book')


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }


  type Query {
  authorCount: Int!
  bookCount: Int!
  allBooks(author: String, genres: String): [Book!]
  allAuthors: [Author]!
  }

  type Mutation {
  addBook(
    title: String!
    published: Int
    author: String
    genres: [String]
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_, args) => {
      let filteredBooks = await Book.find({});
      if (args.genres) {
        filteredBooks = filteredBooks.filter(p => p.genres.includes(args.genres));
      }

      if (args.author) {
        filteredBooks = filteredBooks.filter(p => p.author === args.author);
      }

      return filteredBooks;
    },

    allAuthors: async () => {
      return await Author.find({});
    }
  },

  Author: {
    bookCount: async (author) => {
      return Book.collection.filter((book) => book.author === author.name).length;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        try {
          author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          });
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      });

      try {
        return await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        });
      }
    },

    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('No author found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }


      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          {
            born: args.setBornTo,
          },
          { new: true }
        )
        return updatedAuthor
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
