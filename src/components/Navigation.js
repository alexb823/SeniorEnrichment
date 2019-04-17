import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGraduate,
  faGlobe,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ location }) => {
  const pathStarts = location.pathname.split('/')[1];
  return (
    <Navbar bg="dark" variant="dark" className="mb-4" expand="md">
      <Container>
        <Navbar.Brand href="#/">
          <FontAwesomeIcon icon={faCode} /> Senior Enrichment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ml-auto">

            <Nav.Link
              href="#campuses"
              className={`${pathStarts === 'campuses' ? 'active' : ''}`}
            >
              Campuses <FontAwesomeIcon icon={faGlobe} />
            </Nav.Link>

            <Nav.Link
              href="#students"
              className={`${pathStarts === 'students' ? 'active' : ''}`}
            >
              Students
              <FontAwesomeIcon icon={faUserGraduate} className="ml-1" />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
