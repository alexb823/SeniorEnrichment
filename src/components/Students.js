import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, Image } from 'react-bootstrap';
import StudentList from './StudentList';

const Students = ({ students }) => {
  return (
    <StudentList students={students} />
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
