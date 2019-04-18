import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Card, Row, Col, Button, Collapse } from 'react-bootstrap';
import AddStudent from './AddStudent';

class SingleStudent extends Component {
  constructor() {
    super();
    this.state = {
      openForm: false,
    };
  }
  render() {
    const { student, campus } = this.props;
    let { openForm } = this.state;

    if (!student) {
      return 'Loading...';
    } else {
      return (
        <Card className="mb-4">
          <Card.Header>Student ID: {student.id}</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Image
                  src={student.imageUrl}
                  rounded
                  style={{ height: '140px' }}
                />
              </Col>
              <Col>
                <Card.Title>
                  {student.firstName} {student.lastName}
                </Card.Title>
                <Card.Text>{student.email}</Card.Text>
                <Card.Text>GPA: {student.gpa}</Card.Text>
                {campus ? (
                  <Card.Link href={`#/campuses/${campus.id}`}>
                    {campus.name} Campus
                  </Card.Link>
                ) : (
                  'Student does not have a campus'
                )}
              </Col>
            </Row>
            <Button
              variant="outline-primary"
              onClick={() => this.setState({ openForm: !openForm })}
              aria-controls="edit-student-form"
              aria-expanded={openForm}
              className="mt-4"
            >
              Edit Student
            </Button>
            <Collapse in={this.state.openForm}>
              <div id="edit-student-form" className="my-4">
                <AddStudent student={student} />
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      );
    }
  }
}

//helper function for mapStateToProps
const findStudentAndCampus = (students, campuses, studentId) => {
  const studentInfo = {};
  studentInfo.student = students.find(student => student.id === studentId);
  if (studentInfo.student) {
    studentInfo.campus = campuses.find(
      campus => campus.id === studentInfo.student.campusId
    );
  }
  return studentInfo;
};

const mapStateToProps = (state, ownProps) => {
  const studentId = ownProps.match.params.id * 1;
  return findStudentAndCampus(state.students, state.campuses, studentId);
};

export default connect(mapStateToProps)(SingleStudent);
