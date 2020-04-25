import React, { useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

export default (props) => {

  useEffect(() => {
    if (props.value) {
      document.getElementById('search').value = props.value
    }

    if (props.method) {
      document.getElementById('method').value = props.method
    }

    if (props.field) {
      document.getElementById('field').value = props.field
    }
  }, [props.value, props.method, props.field])

  function handleSearch() {
    const value = document.getElementById('search').value.trim()
    const method = document.getElementById('method').value
    const field = document.getElementById('field').value

    if (props.onSearch) {
      props.onSearch(value, method, field)
    }
  }

  return (
    <Form>
      <Form.Label><strong>Pesquisa</strong></Form.Label>
      <Row>
        <Col xs={5}>
          <Form.Group controlId="search">
            <Form.Control type="text" />
          </Form.Group>
        </Col>

        <Col xs={3}>
          <Form.Group className="combo" controlId="method">
            <Form.Control as="select">
              <option value="b">Texto iniciando com</option>
              <option value="m">Em qualquer parte do texto</option>
              <option value="e">Texto terminando com</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={3}>
          <Form.Group className="combo" controlId="field">
            <Form.Control as="select">
              <option value="user">Nome do usuário</option>
              <option value="title">Título da pergunta</option>
              <option value="text">Texto da pergunta</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={1}>
          <Button block variant="outline-secondary" onClick={ handleSearch }><FaSearch/></Button>
        </Col>
      </Row>

    </Form>
  )
}
