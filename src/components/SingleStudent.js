import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Card, Button, Row, Col } from 'react-bootstrap';

const SingleStudent = ({ student, campus }) => {
  // console.log(student);
  // console.log(campus);
  if (!student) {
    return 'Loading...';
  } else {
    return (
      <Card>
      <Card.Header>Student ID: {student.id}</Card.Header>
      <Card.Body>
      <Row>
      <Col>
      <Image src={student.imageUrl} rounded style={{height: '140px'}} />
      </Col>
      <Col>
        <Card.Title>{student.firstName} {student.lastName}</Card.Title>
        <Card.Text>{student.email}</Card.Text>
        <Card.Text>GPA: {student.gpa}</Card.Text>
        {campus ? (
              <Card.Link href={`#/campuses/${campus.id}`}>{campus.name}</Card.Link>
            ) : (
              'no campus'
            )}
            </Col>
            </Row>
      </Card.Body>
    </Card>
    );
  }
};

//helper function for mapmapStateToProps
const findStudentAndCampus = (students, campuses, studentId) => {
  const studentInfo = {};
  studentInfo.student = students.find(student => student.id === studentId);
  if (studentInfo.student) {
    studentInfo.campus = campuses.find(
      campus => campus.id === studentInfo.student.campusId
    );
    console.log(studentInfo);
  }
  return studentInfo;
};

const mapStateToProps = (state, ownProps) => {
  const studentId = ownProps.match.params.id * 1;
  return findStudentAndCampus(state.students, state.campuses, studentId);
};

export default connect(mapStateToProps)(SingleStudent);
