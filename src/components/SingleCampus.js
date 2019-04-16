import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import StudentList from './StudentList';
import {deleteCampus} from '../store';


const SingleCampus = ({ campus, students, history, deleteCampus }) => {
  if (!campus) {
    return 'Loading...';
  } else {
    const description = campus.description.split('\n \r');
    const handleOnDelete = () => {
      console.log('clicked')
      deleteCampus(campus.id)
      .then(()=> history.push('/campuses'))
      .catch(ex => console.error(ex.respose.data))
    }
    
    return (
      <Fragment>
        <Jumbotron
          className="jumbo-image"
          style={{ backgroundImage: `url(${campus.imageUrl})` }}
        >
          <h1 className="display-3 text-white">{campus.name} Campus</h1>
          <p className="text-white lead">{description[0]}</p>
        </Jumbotron>
        
        <Row className="mb-3">
          <Button variant="outline-danger" className="ml-auto mr-3" onClick={handleOnDelete}>
            Delete Campus <FontAwesomeIcon icon={faMinusCircle}  className="ml-1"/>
          </Button>
        </Row>

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

//helper function for mapmapStateToProps
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

const mapDispatchToProps = dispatch => {
  return {
    deleteCampus: (id)=> dispatch(deleteCampus(id))
  }
}

SingleCampus.propTypes = {
  campus: PropTypes.object,
  students: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
