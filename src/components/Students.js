import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentList from './StudentList';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Students = ({ students }) => {
  return (
    <Container>
      <Row className="my-4">
        <Button
          variant="outline-dark"
          className="ml-auto"
          href="#/students/add"
        >
          New Student <FontAwesomeIcon icon={faPlus} className="ml-1" />
        </Button>
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
