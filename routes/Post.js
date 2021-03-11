const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/createPost', async (req, res) => {
  console.log('Firing')
  try {
    const newPost = await db.blogs.build({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      authorID: req.body.authorID

    })

    const savedPost = await newPost.save()

    res.status(200).json({ message: 'New Post Created', savedPost })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
