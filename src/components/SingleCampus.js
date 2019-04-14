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

const findCampus = (campuses, campusId) => {
  return campuses.find(campus => campus.id === campusId * 1);
};

const filterStudents = (students, campusId) => {
  return students.filter(student => student.campusId === campusId * 1);
};

const mapStateToProps = (state, ownProps) => {
  return {
    campus: findCampus(state.campuses, ownProps.match.params.id),
    students: filterStudents(state.students, ownProps.match.params.id),
  };
};

SingleCampus.propTypes = {
  campus: PropTypes.object,
  students: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(SingleCampus);
