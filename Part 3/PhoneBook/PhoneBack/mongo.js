const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.5b37y.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url);

//Get command line argument
const args = process.argv.slice(3); 

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  important: Boolean,
})

const Person = mongoose.model('persons', personSchema)

if (args.length < 2) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}else{

  const person = new Person({
    name: args[0],
    phone: args[1],
    important: true,
  })
  
  person.save().then(result => {
    console.log('person saved!')
    console.log(args[0] + " " + args[1])
    mongoose.connection.close()
  })

}





