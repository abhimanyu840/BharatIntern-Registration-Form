const mongoose = require('mongoose')
require('dotenv').config({ path: './.env.local' }) || require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

const connectToMongo = mongoose.connection

connectToMongo.on('error', () => {
    console.log('Sorry an error occured while connecting to db')
})

connectToMongo.once('open', () => {
    console.log("Connected to MongoDB")
})

module.exports = connectToMongo
