import React, { useEffect } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import api from '../../services/api'
import './style.css'

import Structure from '../../components/Structure'
import FormNewQuestion from '../../components/FormNewQuestion'
import QuestionList from '../../components/QuestionList'
import { Row, Col } from 'react-bootstrap'

export default () => {

  const [ data, setData ] = useLocalStorage('data', {})

  async function getQuestions() {
    try {
      const res = await api.get(`/v1/questions`)

      setData(res.data)
    } catch(e) {
      alert('Não foi possível carregar a lista de perguntas do servidor.')
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  async function addQuestion(user, title, text) {
    try {
      await api.post('/v1/questions', { user, title, text})

      getQuestions()

      return true
    } catch(e) {
      alert('Não foi possível incluir a nova pergunta')

      return false
    }
  }

  async function deleteQuestion(id) {
    try {
      await api.delete(`/v1/questions/${id}`)

      getQuestions()
    } catch(e) {
      alert('Não foi possível apagar a pergunta pergunta')
    }
  }

  return (
    <Structure>
      <Row>
        <Col>
          <FormNewQuestion
            onSave={ addQuestion }
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <QuestionList
            data={ data.data }
            onDelete={ deleteQuestion }
          />
        </Col>
      </Row>
    </Structure>
  )
}
