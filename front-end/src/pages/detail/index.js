import React, { useEffect } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import api from '../../services/api'
import { useParams, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Structure from '../../components/Structure'
import Question from '../../components/Question'
import FormNewAnswer from '../../components/FormNewAnswer'
import AnswerList from '../../components/AnswerList'
import ModalNotification from '../../components/ModalNotification'
import { Row, Col, Button } from 'react-bootstrap'

export default () => {

  const [ data, setData ] = useLocalStorage('answers', {})
  const [ id, setId ] = useLocalStorage('questionId')

  const params = useParams()
  if (!id) {
    setId(useParams().questionId)
  }

  async function registerView(idValue) {
    try {
      const res = await api.post(`/v1/questions/${idValue}/view`)
      setData(res.data)
    } catch(e) {
      alert('Não foi possível carregar a pergunta.')
    }
  }

  useEffect(() => {
    const { questionId } = params
    setId(questionId)
    registerView(questionId)
  }, [])

  async function refreshQuestion() {
    try {
      const res = await api.get(`/v1/questions/${id}`)
      setData(res.data)
    } catch(e) {
      alert('Não foi possível recarregar a pergunta.')
    }
  }

  async function handleQuestionLike(questionId, operation) {
    try {
      const res = await api.post(`/v1/questions/${questionId}/${operation}`)
      setData(res.data)
    } catch(e) {
      alert(`Erro ao registrar o ${operation} para a pergunta`)
    }
  }

  async function handleAnswerLike(answerId, operation) {
    try {
      await api.post(`/v1/questions/${id}/answers/${answerId}/${operation}`)
      refreshQuestion()
    } catch(e) {
      alert(`Erro ao registrar o ${operation} para a resposta`)
    }
  }

  async function handleOnSave(user, text) {
    try {

      await api.post(`/v1/questions/${id}/answers`, { user, text})
      await refreshQuestion()

      return true
    } catch(e) {
      alert('Houve um erro ao gravar a resposta')
      return false
    }
  }

  let history = useHistory()

  function handleVoltar() {
    history.push('/')
  }

  const [idDelete, setIdDelete] = React.useState(false)
  const [showConfirmation, setShowConfirmation] = React.useState(false)

  async function doDelete() {
    try {
      setShowConfirmation(false)
      await api.delete(`/v1/questions/${id}/answers/${idDelete}`)
      refreshQuestion()
    } catch(e) {
      alert('Houve um erro ao apagar a resposta')
    }
  }

  function handleDelete(deleteId) {
    setIdDelete(deleteId)
    setShowConfirmation(true)
  }

  return (
    <Structure>
      <Row>
        <Col>
        <Button onClick={ handleVoltar }> <FaArrowLeft/> Voltar</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Question
            data={ data }
            onLike={ handleQuestionLike }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Respostas</h3>
        </Col>
      </Row>
      <Row>
        <Col>
        <FormNewAnswer
          onSave={ handleOnSave }
        />
        </Col>
      </Row>
      <Row>
        <Col>
          <AnswerList
            answers={ data.answers }
            onLike={ handleAnswerLike }
            onDelete={ handleDelete }
          />
        </Col>
      </Row>

      <ModalNotification
        show={showConfirmation}
        title="Confirmação"
        message="Confirma a exclusão da resposta?"
      >
        <Button variant="primary" onClick={ doDelete }>
          Sim
        </Button>
        <Button variant="secondary" onClick={ () => setShowConfirmation(false) }>
          Não
        </Button>
      </ModalNotification>

    </Structure>
  )
}
