const express = require('express')
const router = express.Router()
const user = require('./database/user')
const posts = require('./database/posts')

const app = require('./app')

router.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/index.html'))
})

module.exports = router