import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import StudentList from './StudentList';

const SingleCampus = ({ campus, students }) => {
  if (!campus) {
    return 'Loading...';
  } else {
    const description = campus.description.split('\n \r');
    return (
      <Fragment>
        <Jumbotron
          className="jumbo-image"
          style={{ backgroundImage: `url(${campus.imageUrl})` }}
        >
          <h1 className="display-3 text-white">{campus.name} Campus</h1>
          <p className="text-white lead">{description[0]}</p>
        </Jumbotron>

        {description.map(p => (
          <p key={p}>{p}</p>
        ))}

        <div className="bg-light mt-5 mb-3">
          <h3 className="p-3">Students</h3>
        </div>
        <StudentList students={students} />
      </Fragment>
    );
  }
};

const findCampusAndStudents = (campuses, students, campusId) => {
  const data = {};
  data.campus = campuses.find(campus => campus.id === campusId);
  data.students = students.filter(student => student.campusId === campusId);
  return data;
};

const mapStateToProps = (state, ownProps) => {
  const campusId = ownProps.match.params.id * 1;
  return findCampusAndStudents(state.campuses, state.students, campusId);
};

SingleCampus.propTypes = {
  campus: PropTypes.object,
  students: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(SingleCampus);
