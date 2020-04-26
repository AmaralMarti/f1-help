import React from 'react'
import { Row, Card, Col } from 'react-bootstrap'
import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa'

export default (props) => {

  function handleLike(id, operation) {
    if (props.onLike) {
      props.onLike(id, operation)
    }
  }

  function handleDelete(id) {
    if (props.onDelete) {
      props.onDelete(id)
    }
  }

  function getAnswers() {
    if (props.answers) {
      if (props.answers.length > 0) {
        return props.answers.map(answer => (
          <Row>
            <Col>
              <Card key={ answer.id }>
                <Card.Body>
                  <Card.Title>{ answer.likes } votos</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Autoria: { answer.user }</Card.Subtitle>
                  <Card.Text>
                    { answer.text }
                  </Card.Text>
                  <Card.Link href="#" as="button" onClick={() => handleLike(answer.id, 'like') }><FaThumbsUp/></Card.Link>
                  <Card.Link href="#" as="button" onClick={() => handleLike(answer.id, 'dislike') }><FaThumbsDown/></Card.Link>
                  <Card.Link href="#" as="button" onClick={() => handleDelete(answer.id) }><FaTrash/></Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      } else {
        return <h4>Essa pergunta ainda não foi respondida por ninguém, seja o primeiro!</h4>
      }
    } else {
      return <h3>Houve um problema ao carregar as respostas dessa pergunta</h3>
    }
  }

  return (
    <>
      { getAnswers() }
    </>
  )
}
