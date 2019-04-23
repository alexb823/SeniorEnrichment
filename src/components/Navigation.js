import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGraduate,
  faGlobe,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4" expand="md">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <FontAwesomeIcon icon={faCode} /> Senior Enrichment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/campuses">
              <FontAwesomeIcon icon={faGlobe} className="mr-1" />
              Campuses
            </Nav.Link>

            <Nav.Link as={NavLink} to="/students">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
              Students
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
