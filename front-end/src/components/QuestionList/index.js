import React, { useEffect } from 'react'
import { Table, Button, Pagination, Form, Row, Col, Modal } from 'react-bootstrap'
import { FaTrash, FaArrowDown, FaArrowUp, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import './style.css'

export default (props) => {
  useEffect(() => {
    const perPage = props.data.metadata.perPage
    if (perPage) {
      document.getElementById('per-page').value = perPage
    }
  }, [props.data.metadata.perPage])

  function loadQuestions() {
    const questions = ((props.data || {}).data || [])
    if (questions.length > 0) {
      return questions.map(question => (
        <tr key={ question.id }>
          <td className='col-question item'>
            <a href="/">{ question.title }</a>
          </td>
          <td className='col-details'>{ question.answers.length }</td>
          <td className='col-details'>{ question.views }</td>
          <td className='col-details'>{ question.likes }</td>
          <td className='col-details'>
          <Button
              className="btn-func"
              variant="primary"
              size="sm"
              onClick={ () => handleLike(question.id) }>
              <FaThumbsUp/>
            </Button>
            <Button
              className="btn-func"
              variant="primary"
              size="sm"
              onClick={ () => handleDislike(question.id) }>
              <FaThumbsDown/>
            </Button>
            <Button
              className="btn-func"
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
          <td className="col-full" colSpan="5">Nenhum resultado encontrado</td>
        </tr>
      )
    }
  }

  const [idDelete, setIdDelete] = React.useState(false)

  function doDelete() {
    if (props.onDelete) {
      handleClose()
      props.onDelete(idDelete)
    }
  }

  function handleDelete(id) {
    setIdDelete(id)
    setShow(true)
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

  function getDirection() {
    if (props.orderDirection === undefined) {
      return 'asc'
    }

    if (props.orderDirection === 'asc') {
      return 'desc'
    }

    if (props.orderDirection === 'asc') {
      return undefined
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

  function handlePerPage(e) {
    props.data.metadata.perPage = e.target.value
    paginate()
  }

  function handlePagination(pageNum) {
    props.data.metadata.page = pageNum
    paginate()
  }

  function paginate() {
    if (props.onPaginate) {
      props.onPaginate(props.data.metadata.page, props.data.metadata.perPage)
    }
  }

  function getPagination() {
    const { page = 1, pageCount = 1 } = ((props.data || {}).metadata || {})

    let prevNum = parseInt(page - 1)
    const actualNum = parseInt(page)
    let nextNum = parseInt(page + 1)

    prevNum = prevNum <= 0 ? undefined : prevNum
    nextNum = nextNum > pageCount ? undefined : nextNum

    let first = <Pagination.First onClick={ () => handlePagination(1)}/>
    let prev = <Pagination.Item onClick={ () => handlePagination(prevNum)}>{ prevNum }</Pagination.Item>
    let actual = <Pagination.Item active>{ actualNum }</Pagination.Item>
    let next = <Pagination.Item onClick={ () => handlePagination(nextNum)}>{ nextNum }</Pagination.Item>
    let last = <Pagination.Last onClick={ () => handlePagination(pageCount)}/>

    if (!prevNum) {
      first = <Pagination.First disabled/>
      prev = undefined
    }

    if (!nextNum) {
      next = undefined
      last = <Pagination.Last disabled/>
    }

    return (
      <Pagination>
        { first }
        { prev }
        { actual }
        { next }
        { last }
      </Pagination>
    )
  }

  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
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

      <Row>
        <Col xs={2}>
          { getPagination() }
        </Col>
        <Col xs={3}>
        <Form.Group controlId="per-page">
          <Form.Control as="select" onChange={ handlePerPage }>
            <option value='5'>5 perguntas por página</option>
            <option value='10'>10 perguntas por página</option>
            <option value='50'> 50 perguntas por página</option>
            <option value='100'>100 perguntas por página</option>
          </Form.Control>
        </Form.Group>
        </Col>
      </Row>

      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirma a exclusão da pergunta?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ doDelete }>
            Sim
          </Button>
          <Button variant="secondary" onClick={ handleClose }>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
