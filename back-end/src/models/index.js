const Sequelize = require('sequelize')
const dbConfig = require('../config/index')

const Questions = require('../models/questions')
const Answers = require('../models/answers')

const connection = new Sequelize(dbConfig)

Questions.init(connection)
Answers.init(connection)

Questions.associate(connection.models)
Answers.associate(connection.models)

module.exports = connection
