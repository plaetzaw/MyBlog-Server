require('dotenv').config()

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const SALT = 2
const db = require('../models')
const testpass = 'booger'

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/register', async (req, res) => {
  bcrypt.hash(testpass, SALT, function (err, hash) {
    console.log(testpass)
    const hashedtestpass = hash
    console.log(hashedtestpass)
  })

  console.log('Beginning user registration')
  try {
    const password = req.body.password
    console.log(password)
    const hashedpassword = await bcrypt.hash(password, SALT)

    const newUser = await db.users.build({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword
    })
    const savedUser = await newUser.save()

    res.status(200).json({ message: 'New User Created', savedUser })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
