import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { createStudent } from '../store';

class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      student: {
        firstName: '',
        lastName: '',
        email: '',
        gpa: '',
        campusId: '',
        campusName: '',
        imageUrl: '',
      },
      error: '',
    };
  }

  handleChange = ({ target }) => {
    const { student } = this.state;
    student[target.name] = target.value;
    this.setState({ student });
    console.log(this.state.student);
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      gpa,
      campusId,
      campusName,
      imageUrl,
    } = this.state.student;

    const { handleChange } = this;

    return (
      <Form>
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
          <Form.Group>
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
              name="campusName"
              value={campusName}
              onChange={handleChange}
            >
              <option>Choose...</option>
              <option>...</option>
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
