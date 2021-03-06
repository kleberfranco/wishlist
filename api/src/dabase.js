'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('./config/database');
const pathModel = '/api/src/models';
const db = {};

const sequelize = new Sequelize(config);
fs.readdirSync(pathModel).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) &&
      (file.slice(-3) === '.js');
}).forEach((file) => {
  const model = require(path.join(pathModel, file))(sequelize,
      Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
