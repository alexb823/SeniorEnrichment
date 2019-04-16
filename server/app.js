const express = require('express');
const path = require('path');
const { Campus, Student } = require('./db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

app.get('/api/campuses', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
});

app.get('/api/students', (req, res, next) => {
  Student.findAll({ order: [['lastName', 'ASC']] })
    .then(students => res.send(students))
    .catch(next);
});

app.get('/api/campuses/:id', (req, res, next) => {
  Campus.findByPk(req.params.id, {
    include: [
      {
        model: Student,
        where: {
          campusId: req.params.id,
        },
      },
    ],
  })
    .then(campus => res.send(campus))
    .catch(next);
});

app.get('/api/students/:id', (req, res, next) => {
  Student.findByPk(req.params.id, {
    include: [
      {
        model: Campus,
      },
    ],
  })
    .then(student => res.send(student))
    .catch(next);
});

app.post('/api/campuses/create', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.send(campus))
    .catch(next);
});

app.post('/api/students/create', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next) => {
  Student.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/campuses/:id', (req, res, next) => {
  Student.update({ campusId: null }, { where: { campusId: req.params.id } })
    .then(() => Campus.destroy({ where: { id: req.params.id } }))
    .then(() => res.sendStatus(204))
    .catch(next);
});

//handle 404
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

//Error handling endware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500);
  res.send(err.message || 'Internet server error!');
});

module.exports = app;
