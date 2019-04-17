import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { createCampus, updatedCampus } from '../store';

class AddCampus extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialState();
  }

  setInitialState = () => {
    const campus = this.props.campus || {};
    return {
      campus: {
        name: campus.name || '',
        address: campus.address || '',
        description: campus.description || '',
        imageUrl: campus.imageUrl || '',
      },
      error: '',
    };
  };

  handleChange = ({ target }) => {
    const { campus } = this.state;
    campus[target.name] = target.value;
    this.setState({ campus });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history, createCampus, updatedCampus } = this.props;
    const { campus } = this.state;
    if (this.props.campus) {
      updatedCampus(this.props.campus.id, campus).catch(ex => {
        this.setState({ error: ex.response.data });
      });
    } else {
      createCampus(campus)
        .then(() => history.push('/campuses'))
        .catch(ex => {
          this.setState({ error: ex.response.data });
        });
    }
  };

  render() {
    const { name, address, description, imageUrl } = this.state.campus;
    const { error } = this.state;
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

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">field is required</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
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

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {this.props.campus ? 'Update' : 'Create'}
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCampus: campus => dispatch(createCampus(campus)),
    updatedCampus: (id, campus) => dispatch(updatedCampus(id, campus)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddCampus);
