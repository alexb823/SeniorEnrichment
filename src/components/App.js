import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchCampuses, fetchStudents } from '../store';
import Students from './Students';
import Campuses from './Campuses';
import Navigation from './Navigation';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampus from './AddCampus';
import AddStudent from './AddStudent';

class App extends Component {
  componentDidMount() {
    Promise.all([this.props.fetchCampuses(), this.props.fetchStudents()]);
  }
  render() {
    return (
      <Router>
        <Route component={Navigation} />
        <Container>
          <Route exact path="/" render={() => <Redirect to="/campuses" />} />
          <Route exact path="/campuses" component={Campuses} />
          <Route exact path="/students" component={Students} />
          <Switch>
            <Route exact path="/campuses/add" component={AddCampus} />
            <Route exact path="/campuses/:id" component={SingleCampus} />
            <Route exact path="/students/add" component={AddStudent} />
            <Route exact path="/students/:id" component={SingleStudent} />
          </Switch>
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
