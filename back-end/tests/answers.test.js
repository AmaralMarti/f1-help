const request = require('supertest')
const { app } = require('../src/app.js')

const modelQuestions = require('../src/models/questions')
const modelAnswers = require('../src/models/answers')

const {
  BeforeAll,
  AfterAll,
  TruncateAllTables,
  PopulateTable,
} = require('./utils')

const question1 = {
  user: 'Usuario 1',
  title: 'Titulo da pergunta 1',
  text: 'Texto da pergunta 1'
}

const question2 = {
  user: 'Usuario 2',
  title: 'Titulo da pergunta 2',
  text: 'Texto da pergunta 2'
}

const answer1 = {
  questionId: 1,
  user: 'Usuario A',
  text: 'Resposta A'
}

const answer2 = {
  questionId: 1,
  user: 'Usuario B',
  text: 'Resposta B'
}

const answer3 = {
  questionId: 1,
  user: 'Usuario C',
  text: 'Resposta C'
}

async function createAnswers() {
  await PopulateTable(modelQuestions, question1)
  await PopulateTable(modelQuestions, question2)
  await PopulateTable(modelAnswers, answer1)
  await PopulateTable(modelAnswers, answer2)
}

beforeAll(BeforeAll)
afterAll(AfterAll)

describe('A API no endpoint "/v1/questions/<questionId>/answers" com o método GET deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Com <questionId> = 99, retornar status code 404 e a mensagem que a questão não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/99/answers`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The question id 99 couldn't be found.`
      }
    )
  })

  test(`Com <questionId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/abc/answers`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })

  test(`Com <questionId> = 1, retornar status code 200 e a lista com 2 respostas`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/1/answers`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "count": 2,
        "data": [
          {
            "id": 1,
            "user": "Usuario A",
            "text": "Resposta A",
            "likes": 0,
          },

          {
            "id": 2,
            "user": "Usuario B",
            "text": "Resposta B",
            "likes": 0,
          },
        ]
      }
    )
  })

})

describe('A API no endpoint "/v1/questions/<questionId>/answers/<answerId>" com o método GET deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Com <answerId> = 99, retornar status code 404 e a mensagem que a resposta não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/1/answers/99`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The answer id 99 couldn't be found.`
      }
    )
  })

  test(`Com <answerId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/1/answers/abc`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })

  test(`Com <questionId> = 2 e <answerId> = 1, retornar status code 403 e a mensagem que a resposta não pertence a pergunta`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/2/answers/1`)

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({
        error:  `The answer id 1 does not belong to that question`
      }
    )
  })

  test(`Com <answerId> = 1, retornar status code 200 e os dados da resposta respostas`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/1/answers/1`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "id": 1,
        "user": "Usuario A",
        "text": "Resposta A",
        "likes": 0,
      }
    )
  })

})

describe('A API no endpoint "/v1/questions/<questionId>/answers/<answerId>" com o método POST deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Com <answerId> = 1 e não enviando os dados, retornar status code 400 e a indicação do problema`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
      error: 'Answers.user cannot be null, Answers.text cannot be null'
    }
    )
  })

  test(`Com <answerId> = 1 e enviando os dados corretamente, retornar status code 201 e os dados da resposta criada`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers`).send(answer3)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
        "id": 3,
        "user": "Usuario C",
        "text": "Resposta C",
        "likes": 0,
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>/answers/<answerId>" com o método PATCH deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Com <answerId> = 99, retornar status code 404 e a mensagem que a resposta não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/1/answers/99`).send({ text: 'Novo texto' })

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The answer id 99 couldn't be found.`
      }
    )
  })

  test(`Com <answerId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/1/answers/abc`).send({ text: 'Novo texto' })

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })

  test(`Com <questionId> = 2 e <answerId> = 1, retornar status code 403 e a mensagem que a resposta não pertence a pergunta`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/2/answers/1`).send({ text: 'Novo texto' })

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({
        error:  `The answer id 1 does not belong to that question`
      }
    )
  })

  test(`Com <answerId> = 1, retornar status code 200 e os dados da resposta respostas`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/1/answers/1`).send({ text: 'Novo texto' })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "id": 1,
        "user": "Usuario A",
        "text": "Novo texto",
        "likes": 0,
      }
    )
  })

  test(`Com <answerId> = 1, retornar status code 200 e os dados da resposta respostas`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/1/answers/1`).send({ user: 'Novo usuario' })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "id": 1,
        "user": "Novo usuario",
        "text": "Resposta A",
        "likes": 0,
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>/answers/<answerId>" com o método DELETE deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Com <answerId> = 99, retornar status code 404 e a mensagem que a resposta não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/1/answers/99`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The answer id 99 couldn't be found.`
      }
    )
  })

  test(`Com <answerId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/1/answers/abc`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })

  test(`Com <questionId> = 2 e <answerId> = 1, retornar status code 403 e a mensagem que a resposta não pertence a pergunta`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/2/answers/1`)

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({
        error:  `The answer id 1 does not belong to that question`
      }
    )
  })

  test(`Com <answerId> = 1, retornar status code 204 e os dados da resposta respostas`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/1/answers/1`)

    expect(res.statusCode).toEqual(204)
    expect(res.body).toMatchObject({})
  })

})

describe('A API no endpoint "/v1/questions/<questionId>/answers/<answerId>/like" com o método POST deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e os dados da questão com o like aumentado em 1`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers/1/like`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "id": 1,
        "user": "Usuario A",
        "text": "Resposta A",
        "likes": 1,
      }
    )
  })

  test(`Com <answerId> = 99, retornar status code 404 e a mensagem que a resposta não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers/99/like`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The answer id 99 couldn't be found.`
      }
    )
  })

  test(`Com <answerId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers/abc/like`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>/answers/<answerId>/dislike" com o método POST deve...', () => {
  beforeEach(async () => {
    await createAnswers()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e os dados da questão com o like aumentado em 1`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers/1/dislike`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "id": 1,
        "user": "Usuario A",
        "text": "Resposta A",
        "likes": -1,
      }
    )
  })

  test(`Com <answerId> = 99, retornar status code 404 e a mensagem que a resposta não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers/99/dislike`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The answer id 99 couldn't be found.`
      }
    )
  })

  test(`Com <answerId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/answers/abc/dislike`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })
})
