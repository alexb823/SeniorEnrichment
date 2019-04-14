import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, Image } from 'react-bootstrap';

const Students = ({ students }) => {
  return (
    <ListGroup>
      {students.map(student => (
        <ListGroup.Item key={student.id}>
          <Image
            src={student.imageUrl}
            roundedCircle
            className="avatar-small mr-2"
          />
          {student.lastName} {student.firstName}
        </ListGroup.Item>
      ))}
    </ListGroup>
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
