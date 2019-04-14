import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Image } from 'react-bootstrap';

const StudentList = ({ students }) => {
  return (
    <ListGroup>
      {students.map(student => (
        <ListGroup.Item key={student.id} action href={`#/students/${student.id}`}>
          <Image
            src={student.imageUrl}
            roundedCircle
            className="avatar-small mr-3"
          />
          {student.lastName} {student.firstName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
};

export default StudentList;
