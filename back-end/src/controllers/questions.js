const questionModel = require('../models/questions')
const answerModel = require('../models/answers')
const { Sequelize, Op } = require('sequelize')

const Questions = {
  getAll: async (req, res, next) => {
    try {
      const params = await Questions.getParams(req)

      const data = await Questions.getAllQuestions(params)

      res.status(200).json({
        metadata: {
          pageCount: params.pagination.metadata.pageCount,
          page: params.pagination.metadata.page,
          perPage: params.pagination.metadata.perpage,
          rowCount: data.length,
        },
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

  like: async (req, res, next) => {
    Questions.updatelike(1, req, res, next)
  },

  dislike: async (req, res, next) => {
    Questions.updatelike(-1, req, res, next)
  },

  updatelike: async (likeInc, req, res, next) => {
    try {
      const id = req.params.questionId
      let data = await Questions.getQuestionById(id)

      if (data) {
        data.likes += likeInc
        await data.save()

        res.status(200).json(data)
      } else {
        res.status(404).json({ error: `The question id ${id} couldn't be found.` })
      }
    } catch(e) {
      next(e)
    }
  },

  getAllQuestions: async (params) => {
    const data = await questionModel.findAll({
      where: params.where,
      order: params.order,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
      attributes: ['id', 'user', 'title', 'text', [Sequelize.literal('(SELECT COUNT(*) FROM answers WHERE answers.questionId = Questions.id)'), 'answerCount'], 'views', 'likes', 'createdAt', 'updatedAt'],
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

  getParams: async req => {
    const order = Questions.getOrdenation(req)
    const where = Questions.getFilter(req)
    const pagination = await Questions.getPagination(req, where)

    return {
      order,
      where,
      pagination,
    }
  },

  getOrdenation(req) {
    const { order = '' } = req.query
    let field = order

    let output = []

    if (field !== '') {
      let direction = 'ASC'

      if (field[0] == '-') {
        field = field.slice(1)
        direction = 'DESC'
      }

      if (['user', 'title', 'text', 'views', 'likes', 'answers'].includes(field)) {
        if (field === 'answers') {
          field = Sequelize.literal('answerCount')
        }

        output = [
          [ field, direction ]
        ]
      }
    }

    return output
  },

  getFilter(req) {
    let { user = '', title = '', text = '' } = req.query

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

    return where
  },

  getSearchField(value) {
    let output
    if ((value !== '') && (value.indexOf('%') >= 0) ) {
      output = { [Op.like]: value}
    }

    return output
  },

  getPagination: async (req, where) => {
    let { page = 1, perpage = 5 } = req.query

    page = parseInt(page)
    perpage = parseInt(perpage)

    const totalRows = (await Questions.countTotalRows(where)).length
    const pageCount = Math.ceil(totalRows / perpage)

    const limit = perpage
    const offset = (page - 1) * perpage

    const metadata = {
      pageCount,
      page,
      perpage,
    }

    return {
      limit,
      offset,
      metadata,
    }
  },

  countTotalRows: async where => {
    return await questionModel.findAll({
      where,
      attributes: [ 'id' ],
    })
  }
}

module.exports = Questions
