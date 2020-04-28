const answerModel = require('../models/answers')

const Answers = {
  getAll: async (req, res, next) => {
    const questionId = req.parentParams.questionId
    const data = await Answers.getAllAnswers(questionId)

    res.status(200).json({
      count: data.length,
      data,
    })
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params.answerId
      let data = await Answers.getAnswerById(id)

      if (data) {
        const questionId = req.parentParams.questionId

        if (data.questionId !== questionId) {
          return res.status(403).json({ error: `The answer id ${id} does not belong to that question` })
        }
        data = await Answers.clear(data)

        res.status(200).json(data)
      } else {
        res.status(404).json({ error: `The answer id ${id} couldn't be found.` })
      }
    } catch(e) {
      next(e)
    }
  },

  create: async (req, res, next) => {
    try {
      const questionId = req.parentParams.questionId

      let { user, text } = req.body

      const created = await answerModel.create({ questionId, user, text })
      let data = await Answers.getAnswerById(created.id)
      data = await Answers.clear(data)

      res.status(201).json(data)
    } catch(e) {
      next(e)
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.answerId
      let data = await Answers.getAnswerById(id)

      if (data) {
        const questionId = req.parentParams.questionId

        if (data.questionId !== questionId) {
          return res.status(403).json({ error: `The answer id ${id} does not belong to that question` })
        }

        let { user, text, likes } = req.body

        data.user = user || data.user
        data.text = text || data.text
        data.likes = likes || data.likes

        await data.save()

        data = await Answers.clear(data)

        res.status(200).json(data)
      } else {
        res.status(404).json({ error: `The answer id ${id} couldn't be found.` })
      }
    } catch(e) {
      next(e)
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.answerId
      let data = await Answers.getAnswerById(id)

      if (data) {
        const questionId = req.parentParams.questionId

        if (data.questionId !== questionId) {
          return res.status(403).json({ error: `The answer id ${id} does not belong to that question` })
        }

        await data.destroy()

        res.status(204).end()
      } else {
        res.status(404).json({ error: `The answer id ${id} couldn't be found.` })
      }
    } catch(e) {
      next(e)
    }
  },

  like: async (req, res, next) => {
    Answers.sumField('likes', 1, req, res, next)
  },

  dislike: async (req, res, next) => {
    Answers.sumField('likes', -1, req, res, next)
  },

  sumField: async (field, value, req, res, next) => {
    try {
      const id = req.params.answerId
      let data = await Answers.getAnswerById(id)

      if (data) {
        data[field] += parseInt(value)
        await data.save()

        res.status(200).json(data)
      } else {
        res.status(404).json({ error: `The answer id ${id} couldn't be found.` })
      }
    } catch(e) {
      next(e)
    }
  },

  getAllAnswers: async (questionId) => {
    questionId = parseInt(questionId)

    const data = await answerModel.findAll({
      where: { questionId },
      attributes: ['id', 'user', 'text', 'likes', 'createdAt', 'updatedAt'],
    })

    return data
  },

  getAnswerById: async id => {
    id = parseInt(id)

    const data = await answerModel.findOne({
      where: { id },
      attributes: ['id', 'questionId', 'user', 'text', 'likes', 'createdAt', 'updatedAt'],
    })

    return data
  },

  clear: async (answer) => {
    return {
      id: answer.id,
      user: answer.user,
      text: answer.text,
      likes: answer.likes,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}

module.exports = Answers
