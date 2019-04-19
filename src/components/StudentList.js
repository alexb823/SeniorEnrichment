import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, Image, Button, Row, Col } from 'react-bootstrap';
import { deleteStudent } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';

const StudentList = ({ students, deleteStudent }) => {
  return (
    <ListGroup className="mb-3">
      {students.map(student => (
        <Row key={student.id} className="align-items-center my-2" >
          <Col xs={12} sm={11}>
            <ListGroup.Item
              action
              href={`#/students/${student.id}`}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <Image
                  src={student.imageUrl}
                  roundedCircle
                  className="avatar-small mr-2"
                />
                <span>
                  {student.lastName} {student.firstName}
                </span>
              </div>
              <div>ID: {student.id}</div>
            </ListGroup.Item>
          </Col>

          <Col xs={12} sm={1} className="my-2">
            <Button variant="danger" onClick={() => deleteStudent(student.id)}>
              <FontAwesomeIcon icon={faUserSlash}/>
            </Button>
          </Col>
        </Row>
      ))}
    </ListGroup>
  );
};

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => dispatch(deleteStudent(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StudentList);
