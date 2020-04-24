import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import './style.css'

export default (props) => {

  function loadQuestions() {
    const questions = (props.data || [])
    if (questions.length > 0) {
      return questions.map(question => (
        <tr key={ question.id }>
          <td className='col-question'>
            <a href="/">{ question.title }</a>
          </td>
          <td className='col-details'>{ question.answers.length }</td>
          <td className='col-details'>{ question.views }</td>
          <td className='col-details'>{ question.likes }</td>
          <td className='col-details'>
            <Button
              variant="danger"
              size="sm"
              onClick={ () => handleDelete(question.id) }>
              <FaTrash/>
            </Button>
          </td>
        </tr>
        )
      )
    } else {
      return (
        <tr>
          <td colSpan="4">Nenhum resultado encontrado</td>
        </tr>
      )
    }
  }

  function handleDelete(id) {
    if (props.onDelete) {
      props.onDelete(id)
    }
  }

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th className='col-question'>Pergunta</th>
        <th><a href="/">Respostas</a></th>
        <th><a href="/">Views</a></th>
        <th><a href="/">Likes</a></th>
        <th><a href="/"></a></th>
      </tr>
    </thead>
    <tbody>
      { loadQuestions() }
    </tbody>
  </Table>
  )
}
