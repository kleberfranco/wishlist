'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Model customers
   */
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `database/index` file will call this method automatically.
     * @param {Model} models
     */
    static associate(models) {
      // customers.belongsTo(models.wishlists,
      // {foreignKey: 'id', as: 'customer'});
    }
  };
  customers.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
      unique: {
        msg: 'Email address already in use!',
      },
    },
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};
