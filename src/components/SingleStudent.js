import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const SingleStudent = ({ student, campus }) => {
  console.log(student);
  console.log(campus);
  if (!student) {
    return 'Loading...';
  } else {
    return (
      <div>
        {student.firstName}
        {student.lastName}
        {student.gpa}
        {student.email}

        <Image src={student.imageUrl} />

        {campus ? (
          <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
        ) : (
          'no campus'
        )}
      </div>
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
