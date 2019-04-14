import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Action Types
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_STUDENTS = 'GOT_STUDENTS';

//Action Creaters
const gotCampuses = campuses => {
  return {
    type: GOT_CAMPUSES,
    campuses,
  };
};

const gotStudents = students => {
  return {
    type: GOT_STUDENTS,
    students,
  };
};

//reducers
const campuses = (state = [], action) => {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
};

const students = (state = [], action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      return action.students;
    default:
      return state;
  }
};

const reducer = combineReducers({
  campuses,
  students,
});

//thunks
export const fetchCampuses = () => {
  return dispatch => {
    return axios
      .get('/api/campuses')
      .then(response => response.data)
      .then(campuses => dispatch(gotCampuses(campuses)))
          // .then(() => console.log(store.getState()));

  };
};


export const fetchStudents = () => {
  return dispatch => {
    return axios
    .get('/api/students')
    .then(response => response.data)
    .then(students => dispatch(gotStudents(students)))
    // .then(() => console.log(store.getState()));

  };
};

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
