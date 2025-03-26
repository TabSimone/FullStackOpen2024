const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')



const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (_, args) => {
      let query = {};
      
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        } else {
          return []; 
        }
      }
    
      if (args.genres) {
        query.genres = args.genres;
      }
    
      return Book.find(query).populate('author');
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    allGenres: async () => {
      const genres = await Book.distinct('genres'); // Ottieni tutti i generi univoci
      return genres
    }
  },

  Author: {
    bookCount: async (author) => {
      return await Book.countDocuments({ author: author._id });
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      let existingUser  = await User.findOne({ username: args.username });

      if (!existingUser ) {
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
    addBook: async (root, args, context) => {
      console.log("Received arguments:", args);

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('no current user', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
      

      console.log("mi fermo prima")

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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

module.exports = resolvers