const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const addName = process.argv[3]
const addNumber = process.argv[4]

const url = `mongodb+srv://kimmorissanen:${password}@cluster0.oieejcg.mongodb.net/phonebookApp?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv.length > 3) {

const number = new Number({
  name: `${addName}`,
  number: `${addNumber}`,
})

number.save().then(result => {
  console.log(`added ${addName} number ${addNumber} to phonebook`)

mongoose.connection.close()
})

}

else {

Number.find({}).then(result => {
    result.forEach(number => {
      console.log(number)
    })
    mongoose.connection.close()
  })
}