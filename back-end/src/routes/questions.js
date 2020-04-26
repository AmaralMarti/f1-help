const express = require('express')
const router = express.Router()
const controller = require('../controllers/questions')
const answers = require('./answers')

router.get('/', controller.getAll)

router.get('/:questionId', controller.getById)

router.post('/', controller.create)

router.patch('/:questionId', controller.update)

router.delete('/:questionId', controller.delete)

router.post('/:questionId/like', controller.like)

router.post('/:questionId/dislike', controller.dislike)

router.post('/:questionId/view', controller.view)

router.use('/:questionId/answers', controller.validateParams, controller.redirectParams, answers)

module.exports = router
