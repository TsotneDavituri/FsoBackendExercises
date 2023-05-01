const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI_LIBRARY

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky',
    born: null, // birthyear not known
  },
  {
    name: 'Sandi Metz', // birthyear not known
    born: null,
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
  },
]
const populateAuthors = async () => {
  try {
    await Author.deleteMany({}) // clear the authors collection first
    const insertedAuthors = await Author.insertMany(authors)
    console.log(
      `${insertedAuthors.length} authors inserted into the collection`
    )
  } catch (error) {
    console.log(error)
  }
}

const populateBooks = async () => {
  try {
    await Book.deleteMany({}) // clear the books collection first
    const populatedBooks = await Promise.all(
      books.map(async book => {
        const author = await Author.findOne({ name: book.author })
        book.author = author._id // set author to the author's object ID
        return book
      })
    )
    const insertedBooks = await Book.insertMany(populatedBooks)
    console.log(`${insertedBooks.length} books inserted into the collection`)
  } catch (error) {
    console.log(error)
  }
}

// call the functions to populate the collections

populateAuthors()
  .then(() => {
    populateBooks().then(() => {
      mongoose.connection.close()
    })
  })
  .catch(error => {
    console.log(error)
  })
