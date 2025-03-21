const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');



const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


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

  type User {
  username: String!
  id: ID!
  }

  type Token {
  value: String!
  }

  type Query {
  authorCount: Int!
  bookCount: Int!
  allBooks(author: String, genres: String): [Book!]
  allAuthors: [Author]!
   me: User
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
  createUser(
    username: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
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
    createUser: async (root, args) => {
      let user = await User.findOne({ username: args.username });

      if (!user) {
        const user = new User({ username: args.username })

        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      } else {
        throw new GraphQLError('User already exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
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
