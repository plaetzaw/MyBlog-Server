require('dotenv').config()

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const SALT = 2
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/register', async (req, res) => {
  console.log('Beginning user registration')
  try {
    const password = req.body.password
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

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log('Logging in user')
  try {
    const checkUser = await db.users.findOne({ email: email })
    if (checkUser) {
      const checkPassword = await bcrypt.compare(password, checkUser.password)
      if (checkPassword === password) {
        const username = checkUser.username
        const id = checkUser.id
        const email = checkUser.email

        const user = {
          id: id,
          name: username,
          email: email
        }
        const token = jwt.sign(user /// tokenhere)
        )
        res.json({ token: token })
      } else {
        res.status(403).json({ message: 'WRONG PASSWORD' })
      }
    } else {
      res.status(404).json({ message: 'No user Found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})
module.exports = router
