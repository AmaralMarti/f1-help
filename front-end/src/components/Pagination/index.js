import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Pagination } from 'react-bootstrap'

export default (props) => {
  const [ perPage, setPerPage] = useState(5)

  useEffect(() => {
    setPerPage(props.perPage)
    document.getElementById('per-page').value = props.perPage
  }, [props.perPage])

  function handlePerPage(e) {
    const perPageValue = e.target.value
    setPerPage(perPageValue)

    paginate(1, perPageValue)
  }

  function handlePagination(pageNum) {
    paginate(pageNum, perPage)
  }

  function paginate(pageValue, perPageValue) {
    if (props.onPaginate) {
      props.onPaginate(pageValue, perPageValue)
    }
  }

  function getPagination() {
    let prevNum = parseInt(props.page - 1)
    const actualNum = parseInt(props.page)
    let nextNum = parseInt(props.page + 1)

    prevNum = prevNum <= 0 ? undefined : prevNum
    nextNum = nextNum > props.pageCount ? undefined : nextNum

    let first = <Pagination.First onClick={ () => handlePagination(1)}/>
    let prev = <Pagination.Item onClick={ () => handlePagination(prevNum)}>{ prevNum }</Pagination.Item>
    let actual = <Pagination.Item active>{ actualNum }</Pagination.Item>
    let next = <Pagination.Item onClick={ () => handlePagination(nextNum)}>{ nextNum }</Pagination.Item>
    let last = <Pagination.Last onClick={ () => handlePagination(props.pageCount)}/>

    if (!prevNum) {
      first = <Pagination.First disabled/>
      prev = <Pagination.Item disabled>-</Pagination.Item>
    }

    if (!nextNum) {
      next = <Pagination.Item disabled>-</Pagination.Item>
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

  return (
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
  )
}
