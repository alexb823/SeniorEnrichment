import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faGlobe, faCode } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand><FontAwesomeIcon icon={faCode}/> Senior Enrichment</Navbar.Brand>
        <Nav className="ml-auto">

          <Nav.Link href="#campuses">
            Campuses <FontAwesomeIcon icon={faGlobe} />
          </Nav.Link>

          <Nav.Link href="#students">
            Students <FontAwesomeIcon icon={faUserGraduate} className="ml-1" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
