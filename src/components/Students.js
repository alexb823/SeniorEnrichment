import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import StudentList from './StudentList';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Students = ({ students }) => {
  return (
    <Container>
      <Row className="my-4">
        <LinkContainer to="/students/add">
          <Button variant="outline-dark" className="ml-auto">
            New Student <FontAwesomeIcon icon={faPlus} className="ml-1" />
          </Button>
        </LinkContainer>
      </Row>
      <Row>
        <Col style={{ padding: '0' }}>
          <StudentList students={students} />
        </Col>
      </Row>
    </Container>
  );
};

Students.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps)(Students);
