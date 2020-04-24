const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')

require('./models')

app.use(cors())

app.use(bodyParser.json())

app.use('/', routes)

module.exports = { app }
