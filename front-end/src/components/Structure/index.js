import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import './style.css'

export default (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
              F1 Help - Seu forum de perguntas
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        { props.children }
      </Container>
    </>
  )
}
