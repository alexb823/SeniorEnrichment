import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { createStudent } from '../store';

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        firstName: '',
        lastName: '',
        email: '',
        gpa: '',
        campusId: '--None--',
        imageUrl: '',
      },
      campuses: this.props.campuses,
      error: '',
    };
  }

  handleChange = ({ target }) => {
    const { student } = this.state;
    student[target.name] = target.value;
    this.setState({ student });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history, createStudent } = this.props;
    const { student } = this.state;
    createStudent(student)
      .then(() => history.push('/students'))
      .catch(ex => this.setState({ error: ex.response.data }))
  }

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

    console.log(this.state)

    return (
      <Form onSubmit={handleSubmit}>
      {error && (
      <Alert variant="danger">
      <Alert.Heading>Please correct the form</Alert.Heading>
      {error.split(',').map(err => <p key={err}>{err}</p>)}
      </Alert>)}
      
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
              <option value='--None--'>--None--</option>
              {campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);
