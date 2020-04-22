const questionModel = require('../models/questions')
const answerModel = require('../models/answers')

const Questions = {
  getAll: async (req, res, next) => {
    try {
      const data = await Questions.getAllQuestions()

      res.status(200).json({
        count: data.length,
        data,
      })
    } catch(e) {
      next(e)
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params.questionId
      let data = await Questions.getQuestionById(id)

      if (!data) {
        return res.status(404).json({ error: `The question id ${id} couldn't be found.` })
      }

      res.status(200).json(data)
    } catch(e) {
      next(e)
    }
  },

  create: async (req, res, next) => {
    try {
      const { user, title, text } = req.body

      const created = await questionModel.create({ user, title, text })
      let data = await Questions.getQuestionById(created.id)

      res.status(201).json(data)
    } catch(e) {
      next(e)
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.questionId
      let data = await Questions.getQuestionById(id)

      if (data) {
        let { user, title, text, views, likes } = req.body

        data.user = user || data.user
        data.title = title || data.title
        data.text = text || data.text
        data.views = views || data.views
        data.likes = likes || data.likes

        await data.save()

        res.status(200).json(data)

      } else {
        res.status(404).json({ error: `The question id ${id} couldn't be found.` })
      }
    } catch(e) {
      next(e)
    }
  },

  delete: async (req, res, next) => {
    try{
      const id = req.params.questionId
      const data = await Questions.getQuestionById(id)

      if (!data) {
        return res.status(404).json({ error: `The question id ${id} couldn't be found.` })
      }

      await data.destroy()
      res.status(204).end()
    } catch(e) {
      next(e)
    }
  },

  getAllQuestions: async () => {
    const data = await questionModel.findAll({
      attributes: ['id', 'user', 'title', 'text', 'views', 'likes', 'createdAt', 'updatedAt'],
      include: [
        {
          model: answerModel,
          as: 'answers',
          attributes: ['id', 'user', 'text', 'likes', 'createdAt', 'updatedAt'],
        },
      ]
    })

    return data
  },

  getQuestionById: async id => {
    id = parseInt(id)

    const data = await questionModel.findOne({
      where: { id },
      attributes: ['id', 'user', 'title', 'text', 'views', 'likes', 'createdAt', 'updatedAt'],
      include: [
        {
          model: answerModel,
          as: 'answers',
          attributes: ['id', 'user', 'text', 'likes', 'createdAt', 'updatedAt'],
        },
      ]
    })

    return data
  },

  validateParams: async (req, res, next) => {
    try {
      const id = req.params.questionId
      let data = await Questions.getQuestionById(id)

      if (!data) {
        return res.status(404).json({ error: `The question id ${id} couldn't be found.` })
      }
      next()
    } catch(e) {
      next(e)
    }
  },

  redirectParams: async (req, res, next) => {
    const parentParams = req.parentParams || {}

    parentParams.questionId = parseInt(req.params.questionId)

    req.parentParams = parentParams
    next()
  },
}

module.exports = Questions
