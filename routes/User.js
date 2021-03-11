const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post("/createUser", async (req, res) => {
    try {
        newUser = await db.blogs.build({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            authorID: req.body.authorID

        })
    }

    let savedUser = await newPost.save()

    res.status(200).json({ message: "New User Created", savedUser})
    catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})

    }
   
})