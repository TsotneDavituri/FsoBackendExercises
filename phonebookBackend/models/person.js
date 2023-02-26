const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log(process.env, "hello")
const url = process.env.MONGODB_URI_PHONEBOOK

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {    
    console.log('connected to MongoDB')  })  
    .catch((error) => {    
        console.log('error connecting to MongoDB:', error.message)  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)