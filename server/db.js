const Sequelize = require('sequelize');
const faker = require('faker');
const path = require('path');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

// // For cloud9 db
// const db = new Sequelize('campuses_students_db', 'ubuntu', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
// });

//models
const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {msg: 'Campus name must be unique'},
    validate: {
      notEmpty:{msg: 'Campus name can\'t be empty'},
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'default_campus.jpg',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {msg: 'Campus address must be unique'},
    validate: {
      notEmpty: {msg: 'Campus address can\'t be empty'},
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
}, {
  hooks: {
    beforeSave: (campus) => {
      if(!campus.imageUrl) campus.imageUrl = 'default_campus.jpg';
    }
  }
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
    unique: {msg: 'Email must be unique'},
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
            description: faker.lorem.paragraphs(3),
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

