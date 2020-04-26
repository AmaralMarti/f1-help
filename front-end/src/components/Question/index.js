import React from 'react'
import { Card } from 'react-bootstrap'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

export default (props) => {
  function handleLike(id, operation) {
    if (props.onLike) {
      props.onLike(id, operation)
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{ props.data.title }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Autoria: { props.data.user }</Card.Subtitle>
        <Card.Text>
          { props.data.text }
        </Card.Text>
        <p className="text-muted">Views: { props.data.views } | Likes: { props.data.likes }</p>

        <Card.Link href="#" as="button" onClick={() => handleLike(props.data.id, 'like') }><FaThumbsUp/></Card.Link>
        <Card.Link href="#" as="button" onClick={() => handleLike(props.data.id, 'dislike') }><FaThumbsDown/></Card.Link>
      </Card.Body>
    </Card>
  )
}
