const Sequelize = require('sequelize');
const faker = require('faker');
const path = require('path');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

//models
const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: path.join(__dirname, '..', 'public', 'default_campus.jpg'),
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'user-graduate-solid.svg',
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

//Associations
Campus.hasMany(Student);
Student.belongsTo(Campus);

//Syncing and seeding the database
const campusNames = ['Luna', 'Terra', 'Mars', 'Titan'];

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() =>
      Promise.all(
        campusNames.map(campusName => {
          return Campus.create({
            name: campusName,
            imageUrl: `${campusName}.jpg`,
            address: `${faker.address.streetAddress()}, ${campusName}`,
            description: faker.lorem.paragraphs(4),
          });
        })
      )
    )
    .then(campuses => {
      campuses.forEach(campus => {
        let count = 0;
        while (count < 5) {
          Student.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            imageUrl: faker.internet.avatar(),
            gpa: parseFloat((Math.random() * 4).toFixed(1)),
            campusId: campus.id,
          });
          ++count;
        }
      });
    })
    .then(() => console.log('Database has been synced and seeded!'))
    .catch(err => console.error(err));
};

module.exports = { Campus, Student, syncAndSeed };

// Promise.all([
//   Campus.create({
//     name: 'Luna',
//     imageUrl: 'Moon.jpg',
//     address: `${faker.address.streetAddress()}, Moon`,
//     description: faker.lorem.paragraphs(4),
//   }),
//   Campus.create({
//     name: 'Terra',
//     imageUrl: 'Earth.jpg',
//     address: `${faker.address.streetAddress()}, Earth`,
//     description: faker.lorem.paragraphs(4),
//   }),
//   Campus.create({
//     name: 'Mars',
//     imageUrl: 'Mars.jpg',
//     address: `${faker.address.streetAddress()}, Mars`,
//     description: faker.lorem.paragraphs(4),
//   }),
//   Campus.create({
//     name: 'Titan',
//     imageUrl: 'Titan.jpg',
//     address: `${faker.address.streetAddress()}, Titan`,
//     description: faker.lorem.paragraphs(4),
//   }),
// ])
// )
