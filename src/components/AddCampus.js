import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class AddCampus extends Component {
  constructor() {
    super();
    this.state = {
      campus: {
        name: '',
        address: '',
        description: '',
        imageUrl: '',
      },
      error: '',
    };
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" />
          <Form.Text className="text-muted">name is required</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" />
          <Form.Text className="text-muted">address is required</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form>
    );
  }
}

export default AddCampus;
