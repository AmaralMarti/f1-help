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

const question3 = {
  user: 'Usuario 3',
  title: 'Titulo da pergunta 3',
  text: 'Texto da pergunta 3'
}

async function createQuestions() {
  await PopulateTable(modelQuestions, question1)
  await PopulateTable(modelQuestions, question2)
  await PopulateTable(modelQuestions, question3)
}

beforeAll(BeforeAll)
afterAll(AfterAll)


describe('A API no endpoint "/" com o método GET deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e a lista de endpoints da API`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/`)

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
        'questions',
        'answers',
    ]
    )
  })
})

describe('A API no endpoint "/v1/questions" com o método GET deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e a lista com 3 questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },

          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },

          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando forem envidados os parâmetros de paginação, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?perpage=2&page=1`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 2,
          "page": 1,
          "perPage": 2,
          "rowCount": 2
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          }
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de ordenação pelo ID, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?order=id`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de ordenação ascendente, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?order=user`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de ordenação pela quantidade de respostas, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?order=answers`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de ordenação descendente, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?order=-user`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de filtro pelo inicio, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?user=usuario%`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de filtro por qualquer posição, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?user=%usuario%`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de filtro pelo título, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?title=titulo%`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })

  test(`Quando for envidado o parâmetro de filtro pelo texto, retornar status code 200 e a lista com as questões`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions?text=texto%`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
        "metadata": {
          "pageCount": 1,
          "page": 1,
          "perPage": 5,
          "rowCount": 3
        },
        "data": [
          {
            "id": 1,
            "user": "Usuario 1",
            "title": "Titulo da pergunta 1",
            "text": "Texto da pergunta 1",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 2,
            "user": "Usuario 2",
            "title": "Titulo da pergunta 2",
            "text": "Texto da pergunta 2",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
          {
            "id": 3,
            "user": "Usuario 3",
            "title": "Titulo da pergunta 3",
            "text": "Texto da pergunta 3",
            "answerCount": 0,
            "views": 0,
            "likes": 0,
            "answers": []
          },
        ]
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>" com o método GET deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Com <questionId> = 1, retornar status code 200 e a primeira questão cadastrada`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/1`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Titulo da pergunta 1",
      "text": "Texto da pergunta 1",
      "views": 0,
      "likes": 0,
      "answers": []
      }
    )
  })

  test(`Com <questionId> = 99, retornar status code 404 e a mensagem que a questão não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/99`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The question id 99 couldn't be found.`
      }
    )
  })

  test(`Com <questionId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).get(`/v1/questions/abc`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })
})

describe('A API no endpoint "/v1/questions" com o método POST deve...', () => {
  beforeEach(TruncateAllTables)

  afterEach(TruncateAllTables)

  test(`Com o envio de dados corretos, retornar status code 201 e os dados da questão cadastrada`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions`).send(question1)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Titulo da pergunta 1",
      "text": "Texto da pergunta 1",
      "views": 0,
      "likes": 0,
      "answers": []
      }
    )
  })

  test(`Sem o envio de dados, retornar status code 400 e a mensagem avisando do erro`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
      error: `Questions.user cannot be null, Questions.title cannot be null, Questions.text cannot be null`
      }
    )
  })
})

describe('A API no endpoint "/v1/questions<questionId>" com o método PATCH deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Com o envio do titulo, retornar status code 200 e os dados da questão alterada`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/1`).send({ title: 'Novo titulo'})

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Novo titulo",
      "text": "Texto da pergunta 1",
      "views": 0,
      "likes": 0,
      "answers": []
      }
    )
  })

  test(`Com o envio do texto, retornar status code 200 e os dados da questão alterada`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/1`).send({ text: 'Novo texto'})

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Titulo da pergunta 1",
      "text": "Novo texto",
      "views": 0,
      "likes": 0,
      "answers": []
      }
    )
  })

  test(`Com <questionId> = 99, retornar status code 404 e a mensagem que a questão não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/99`).send({ title: 'Novo titulo'})

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The question id 99 couldn't be found.`
      }
    )
  })

  test(`Com <questionId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).patch(`/v1/questions/abc`).send({ title: 'Novo titulo'})

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })
})

describe('A API no endpoint "/v1/questions<questionId>" com o método DELETE deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Com <questionId> = 1, retornar status code 200 e os dados da questão alterada`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/1`)

    expect(res.statusCode).toEqual(204)
    expect(res.body).toMatchObject({}
    )
  })

  test(`Com <questionId> = 99, retornar status code 404 e a mensagem que a questão não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/99`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The question id 99 couldn't be found.`
      }
    )
  })

  test(`Com <questionId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).delete(`/v1/questions/abc`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>/like" com o método POST deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e os dados da questão com o like aumentado em 1`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/like`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Titulo da pergunta 1",
      "text": "Texto da pergunta 1",
      "views": 0,
      "likes": 1,
      "answers": []
      }
    )
  })

  test(`Com <questionId> = 99, retornar status code 404 e a mensagem que a questão não foi encontrada`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/99/like`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({
        error:  `The question id 99 couldn't be found.`
      }
    )
  })

  test(`Com <questionId> = abc, retornar status code 400 e a mensagem que a requisição está incorreta`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/abc/like`)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
        error: 'The request is incorrect'
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>/dislike" com o método POST deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e os dados da questão com o like diminuido em 1`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/dislike`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Titulo da pergunta 1",
      "text": "Texto da pergunta 1",
      "views": 0,
      "likes": -1,
      "answers": []
      }
    )
  })
})

describe('A API no endpoint "/v1/questions/<questionId>/view" com o método POST deve...', () => {
  beforeEach(async () => {
    await createQuestions()
  })

  afterEach(TruncateAllTables)

  test(`Retornar status code 200 e os dados da questão com views aumentado em 1`, async () => {
    expect.assertions(2)

    const res = await request(app).post(`/v1/questions/1/view`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "id": 1,
      "user": "Usuario 1",
      "title": "Titulo da pergunta 1",
      "text": "Texto da pergunta 1",
      "views": 1,
      "likes": 0,
      "answers": []
      }
    )
  })
})
