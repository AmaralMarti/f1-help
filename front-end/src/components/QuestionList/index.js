import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaArrowDown, FaArrowUp, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import Pagination from '../Pagination'
import ModalNotification from '../ModalNotification'
import './style.css'

export default (props) => {

  function getButton(icon, variant, onClick) {
    return (
      <Button
        className="btn-func"
        variant={ variant }
        size="sm"
        onClick={ onClick }
      >
        { icon }
      </Button>
    )
  }

  function loadQuestions() {
    const questions = ((props.data || {}).data || [])
    if (questions.length > 0) {
      return questions.map(question => (
        <tr key={ question.id }>
          <td className='col-question item'><Link to={`/questions/${question.id}`}>{ question.title }</Link></td>
          <td className='col-details'>{ question.answers.length }</td>
          <td className='col-details'>{ question.views }</td>
          <td className='col-details'>{ question.likes }</td>
          <td className='col-details'>
            { getButton(<FaThumbsUp/>, 'primary', () => handleLike(question.id)) }
            { getButton(<FaThumbsDown/>, 'primary', () => handleDislike(question.id)) }
            { getButton(<FaTrash/>, 'danger', () => handleDelete(question.id)) }
          </td>
        </tr>
      ))
    } else {
      return (
        <tr>
          <td className="col-full" colSpan="5">Nenhum resultado encontrado</td>
        </tr>
      )
    }
  }

  const [idDelete, setIdDelete] = React.useState(false)
  const [showConfirmation, setShowConfirmation] = React.useState(false)

  function doDelete() {
    if (props.onDelete) {
      setShowConfirmation(false)
      props.onDelete(idDelete)
    }
  }

  function handleDelete(id) {
    setIdDelete(id)
    setShowConfirmation(true)
  }

  function handleOrder(e, field) {
    e.preventDefault()

    if (props.onOrder) {
      let direction
      if (field !== props.orderField) {
        direction = 'asc'
      } else {
        direction = getDirection()
      }

      if (direction === undefined) {
        field = undefined
      }

      props.onOrder(field, direction)
    }
  }

  function getDirection() {
    if (props.orderDirection === undefined) {
      return 'asc'
    }

    if (props.orderDirection === 'asc') {
      return 'desc'
    }

    if (props.orderDirection === 'desc') {
      return undefined
    }
  }

  function handleLike(id) {
    if (props.onLike) {
      props.onLike(id)
    }
  }

  function handleDislike(id) {
    if (props.onDislike) {
      props.onDislike(id)
    }
  }

  function getColumnHeaderIcon(field) {
    return props.orderField === field ?
      props.orderDirection === 'asc' ?
        <FaArrowDown/>
        :
        <FaArrowUp/>
      :
      <span></span>
  }

  function paginate(page, perPage) {
    if (props.onPaginate) {
      props.onPaginate(page, perPage)
    }
  }

  return (
    <>
      <Pagination
        pageCount={ ((props.data || {}).metadata || {}).pageCount || 1 }
        perPage={ ((props.data || {}).metadata || {}).perPage || 5 }
        page={ ((props.data || {}).metadata || {}).page || 1 }
        onPaginate={ paginate }
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='col-question'><a href="/" onClick={ e => handleOrder(e, 'title') }>Pergunta { getColumnHeaderIcon('title') }</a></th>
            <th><a href="/" onClick={ e => handleOrder(e, 'answers') }>Respostas { getColumnHeaderIcon('answers') }</a></th>
            <th><a href="/" onClick={ e => handleOrder(e, 'views') }>Views { getColumnHeaderIcon('views') }</a></th>
            <th><a href="/" onClick={ e => handleOrder(e, 'likes') }>Likes { getColumnHeaderIcon('likes') }</a></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { loadQuestions() }
        </tbody>
      </Table>

      <ModalNotification
        show={showConfirmation}
        title="Confirmação"
        message="Confirma a exclusão da pergunta?"
      >
        <Button variant="primary" onClick={ doDelete }>
          Sim
        </Button>
        <Button variant="secondary" onClick={ () => setShowConfirmation(false) }>
          Não
        </Button>
      </ModalNotification>
    </>
  )
}
