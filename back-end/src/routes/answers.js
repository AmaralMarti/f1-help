const express = require('express')
const router = express.Router()
const controller = require('../controllers/answers')

router.get('/', controller.getAll)

router.get('/:answerId', controller.getById)

router.post('/', controller.create)

router.patch('/:answerId', controller.update)

router.delete('/:answerId', controller.delete)

module.exports = router
