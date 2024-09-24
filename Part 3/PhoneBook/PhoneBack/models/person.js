const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.set('strictQuery',false)
mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  phone : {
    type: String,
    minLength: 8,
    required: true,
    validator: function(v) {
      // Regular expression to match the desired phone number format
      return /^(\d{2,3})-(\d{5,8})$/.test(v)
    },
    message: props => `${props.value} is not a valid phone number!`
  },
  important: Boolean,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('persons', personSchema)