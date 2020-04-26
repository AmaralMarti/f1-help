import React from 'react'
import { Accordion, Card, Button, Form } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
// import './style.css'

export default (props) => {
  async function addAnswer() {
    const userInput = document.getElementById('user')
    const textInput = document.getElementById('text')

    const user = userInput.value.trim()
    const text = textInput.value.trim()

    const userOk = user !== ''
    const textOk = text !== ''

    if (userOk) {
      userInput.classList.remove('is-invalid')
    } else {
      userInput.classList.add('is-invalid')
    }

    if (textOk) {
      textInput.classList.remove('is-invalid')
    } else {
      textInput.classList.add('is-invalid')
    }

    if (props.onSave && userOk && textOk) {
      if (await props.onSave(user, text)) {
        userInput.value = ''
        textInput.value = ''
      }
    }
  }

  function handleChange(e) {
    if (e.target.value.trim() !== '') {
      e.target.classList.remove('is-invalid')
    } else {
      e.target.classList.add('is-invalid')
    }
  }

  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} eventKey="0">
            <FaPlus/> Responder
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form>
              <Form.Label><strong>Nova Resposta</strong></Form.Label>
              <Form.Group>
                <Form.Label>Nome do usuário</Form.Label>
                <Form.Control id="user" type="text" onChange={ e => handleChange(e) }/>
                <Form.Control.Feedback type="invalid">Essa campo não pode ficar em branco</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Resposta</Form.Label>
                <Form.Control id="text" as="textarea" rows="2" onChange={ e => handleChange(e) }/>
                <Form.Control.Feedback type="invalid">Essa campo não pode ficar em branco</Form.Control.Feedback>
              </Form.Group>
              <Button onClick={ addAnswer } variant="success">Gravar</Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}
