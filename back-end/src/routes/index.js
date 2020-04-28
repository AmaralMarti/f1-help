const express = require('express')
const router = express.Router()
const questions = require('./questions')

router.get('/', (req, res) => {
  const protocol = req.protocol
  const host = req.get('host')
  res.status(200).json({
    questions: `${protocol}://${host}/v1/questions`,
    answers: `${protocol}://${host}/v1/questions/<questionId>/answers`,
  })
})

router.use('/v1/questions', questions)

router.use((err, req, res, next) => {
  // let error = (err.parent || {}).sqlMessage
  if (err.errors) {
    error = ''
    for (const i in err.errors) {
      if (error !== '') error += ', '
      error += err.errors[i].message + ''
    }
  } else {
    error = 'The request is incorrect'
  }
  res.status(400).json({ error })
})

module.exports = router
