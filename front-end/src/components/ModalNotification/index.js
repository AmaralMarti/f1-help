import React from 'react'
import { Modal } from 'react-bootstrap'

export default (props) => {

  const handleClose = () => props.show = false

  return (
    <Modal show={ props.show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{ props.title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { props.message }
      </Modal.Body>
      <Modal.Footer>
        { props.children }
      </Modal.Footer>
    </Modal>
  )
}
