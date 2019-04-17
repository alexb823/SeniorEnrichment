import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron, Row, Button, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import StudentList from './StudentList';
import { deleteCampus } from '../store';
import AddCampus from './AddCampus';

class SingleCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
    };
  }

  render() {
    const { campus, students, history, deleteCampus } = this.props;
    let { openForm } = this.setState;

    if (!campus) {
      return 'Loading...';
    } else {
      const description = campus.description.split('\n');
      const handleOnDelete = () => {
        deleteCampus(campus.id)
          .then(() => history.push('/campuses'))
          .catch(ex => console.error(ex.response.data));
      };

      return (
        <Fragment>
          <Jumbotron
            className="jumbo-image"
            style={{ backgroundImage: `url(${campus.imageUrl})` }}
          >
            <h1 className="display-3 text-white">{campus.name} Campus</h1>
            <p className="text-white lead">{description[0]}</p>
          </Jumbotron>

          <p className="text-right font-italic">{campus.address}</p>

          {description.map((p, index) => (
            <p key={index}>{p}</p>
          ))}

          <Row className="my-4 px-3">
            <Button
            variant="outline-primary"
              onClick={() => {
                openForm = !this.state.openForm;
                this.setState({ openForm });
              }}
              aria-controls="edit-campus-form"
              aria-expanded={openForm}
            >
              Edit Campus
            </Button>
            <Button
              variant="outline-danger"
              className="ml-auto"
              onClick={handleOnDelete}
            >
              Delete Campus
              <FontAwesomeIcon icon={faMinusCircle} className="ml-2" />
            </Button>
          </Row>

          <Collapse in={this.state.openForm}>
            <div id="edit-campus-form">
              <AddCampus campus={campus} />
            </div>
          </Collapse>

          <div className="bg-light mt-5 mb-3">
            <h3 className="p-3">Students</h3>
          </div>
          <StudentList students={students} />
        </Fragment>
      );
    }
  }
}

//helper function for mapStateToProps
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
    deleteCampus: id => dispatch(deleteCampus(id)),
  };
};

SingleCampus.propTypes = {
  campus: PropTypes.object,
  students: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);
