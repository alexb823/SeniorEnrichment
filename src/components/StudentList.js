import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Image } from 'react-bootstrap';

const StudentList = ({ students }) => {
  return (
    <ListGroup className="mb-3">
      {students.map(student => (
        <ListGroup.Item
          key={student.id}
          action
          href={`#/students/${student.id}`}
        >
          <Image
            src={student.imageUrl}
            roundedCircle
            className="avatar-small mr-3"
          />
          <span>{student.lastName} {student.firstName}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
};

export default StudentList;
