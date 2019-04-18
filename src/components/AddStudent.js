import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { createStudent, updateStudent } from '../store';

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitState();
  }

  setInitState = () => {
    const student = this.props.student || {};
    return {
      student: {
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        gpa: student.gpa || '',
        campusId: student.campusId || '--None--',
        imageUrl: student.imageUrl || '',
      },
      campuses: this.props.campuses,
      error: '',
    };
  };

  handleChange = ({ target }) => {
    const { student } = this.state;
    student[target.name] = target.value;
    this.setState({ student });
  };

  componentDidUpdate = prevProps => {
    if (this.props.campuses.length && !prevProps.campuses.length) {
      this.setState({ campuses: this.props.campuses });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history, createStudent, updateStudent } = this.props;
    const { student } = this.state;
    if (this.props.student) {
      updateStudent(this.props.student.id, student)
        .then(() => this.setState({error: ''}))
        .catch(ex => this.setState({ error: ex.response.data }));
    } else {
      createStudent(student)
        .then(() => history.push('/students'))
        .catch(ex => this.setState({ error: ex.response.data }));
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      gpa,
      campusId,
      imageUrl,
    } = this.state.student;

    const { campuses, error } = this.state;

    const { handleChange, handleSubmit } = this;

    return (
      <Form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Please correct the form</Alert.Heading>
            {error.split(',').map(err => (
              <p key={err}>{err}</p>
            ))}
          </Alert>
        )}

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">field is required</Form.Text>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">field is required</Form.Text>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">field is required</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} xs={3}>
            <Form.Label>GPA</Form.Label>
            <Form.Control
              type="text"
              name="gpa"
              value={gpa}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Campus</Form.Label>
            <Form.Control
              as="select"
              name="campusId"
              value={campusId}
              onChange={handleChange}
            >
              <option value="--None--">--None--</option>
              {campuses.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          {this.props.student ? 'Updated' : 'Add'}
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
    updateStudent: (id, student) =>
      dispatch(updateStudent(id, student)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);
