import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchCampuses, fetchStudents } from '../store';
import Students from './Students';
import Campuses from './Campuses';
import Navigation from './Navigation';

class App extends Component {
  componentDidMount() {
    Promise.all([this.props.fetchCampuses(), this.props.fetchStudents()]);
  }
  render() {
    return (
      <Router>
        <Route component={Navigation} />
        <Container>
          <Route path="/campuses" component={Campuses} />
          <Route path="/students" component={Students} />
        </Container>
      </Router>
    );
  }
}

App.propTypes = {
  fetchCampuses: PropTypes.func,
  fetchStudents: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampuses: () => dispatch(fetchCampuses()),
    fetchStudents: () => dispatch(fetchStudents()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
