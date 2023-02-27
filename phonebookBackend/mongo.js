const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('provide either the first 3 or all 5 arguments: node, mongo.js, pw, name in brackets "like this", phonenumber')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://tsotnedavituri:${password}@cluster0.y9zvnvx.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: `${name}`,
  number: `${number}`
})

if (process.argv.length === 3) {
  console.log(`phonebook: `)
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}
if (process.argv.length === 5) {
  person.save().then(() => {
    console.log(`added ${name} with number ${number} to phonebook`)
    mongoose.connection.close()
  })
}