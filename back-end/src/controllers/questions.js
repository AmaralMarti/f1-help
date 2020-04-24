const questionModel = require('../models/questions')
const answerModel = require('../models/answers')
const { Op } = require('sequelize')

const Questions = {
  getAll: async (req, res, next) => {
    try {
      const params = Questions.getParams(req)

      const data = await Questions.getAllQuestions(params)

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

  getAllQuestions: async (params) => {
    const data = await questionModel.findAll({
      where: params.where,
      order: params.order,
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

  getParams: (req) => {
    let { order = '', user = '', title = '', text = '' } = req.query

    order = Questions.getOrdenation(order)
    user = Questions.getSearchField(user)
    title = Questions.getSearchField(title)
    text = Questions.getSearchField(text)

    const where = {}

    if (user) {
      where.user = user
    }

    if (title) {
      where.title = title
    }

    if (text) {
      where.text = text
    }

    return {
      order,
      where,
    }
  },

  getOrdenation(field) {
    let output = []

    if (field !== '') {
      let direction = 'ASC'

      if (field[0] == '-') {
        field = field.slice(1)
        direction = 'DESC'
      }

      if (['user', 'title', 'text', 'views', 'likes'].includes(field)) {
        output = [
          [ field, direction ]
        ]
      }
    }

    return output
  },

  getSearchField(value) {
    let output
    if ((value !== '') && (value.indexOf('%') >= 0) ) {
      output = { [Op.like]: value}
    }

    return output
  }


}

module.exports = Questions
