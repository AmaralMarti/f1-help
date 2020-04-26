const express = require('express')
const router = express.Router()
const controller = require('../controllers/answers')

router.get('/', controller.getAll)

router.get('/:answerId', controller.getById)

router.post('/', controller.create)

router.patch('/:answerId', controller.update)

router.delete('/:answerId', controller.delete)

router.post('/:answerId/like', controller.like)

router.post('/:answerId/dislike', controller.dislike)

module.exports = router
