const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const connectToMongo = require('./db')
const bcrypt = require('bcryptjs')
const user_model = require('./models/user.model')

require('dotenv').config({ path: './.env.local' }) || require('dotenv').config()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectToMongo;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.post('/', async (req, res) => {
    const { name, dob, gender, email, phone, address, password } = req.body;


    try {

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)
        const newUser = new user_model({ name, dob, gender: gender.toUpperCase(), email, phoneNo: phone, address, password: secPass })
        const createdUser = await newUser.save()
        console.log(createdUser)
        res.status(201).sendFile(path.join(__dirname, 'public/success.html'))
    } catch (error) {
        console.log("Some error occured", error)
        res.status(500).sendFile(path.join(__dirname, 'public/error.html'))
    }

    // res.sendFile(path.join(__dirname, 'public/index.html'))

})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'))
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})