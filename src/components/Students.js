import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentList from './StudentList';
import { Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Students = ({ students }) => {
  return (
    <Fragment>
      <Row className="my-4">
        <Button
          variant="outline-dark"
          className="ml-auto mr-3"
          href="#/students/add"
        >
          New Student <FontAwesomeIcon icon={faPlus} className="ml-1" />
        </Button>
      </Row>

      <StudentList students={students} />
    </Fragment>
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
