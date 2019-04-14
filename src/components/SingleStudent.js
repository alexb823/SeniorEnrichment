import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';

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
    {student.email}
    {student.gra}
    <Image src={student.imageUrl}/>
    {campus ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'no campus'}
    </div>);
  }
};

const findStudent = (students, studentId) => {
  return students.find(student => student.id === studentId);
};

const findStudentAndCampus = (students, campuses, studentId) => {
  const studentInfo = {};
  studentInfo.student = findStudent(students, studentId);
  if (studentInfo.student) {
    studentInfo.campus = campuses.find(
      campus => campus.id === studentInfo.student.campusId
    );
    console.log(studentInfo)
  }
  return studentInfo;
};

const mapStateToProps = (state, ownProps) => {
  return findStudentAndCampus(
    state.students,
    state.campuses,
    ownProps.match.params.id * 1
  );
};

export default connect(mapStateToProps)(SingleStudent);
