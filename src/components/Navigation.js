import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand>Senior Enrichment</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#campuses">Campuses</Nav.Link>
          <Nav.Link href="#students">Students</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
