'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class customers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `database/index` file will call this method automatically.
         */
        static associate(models) {
            //customers.belongsTo(models.wishlists, {foreignKey: 'id', as: 'customer'})
        }
    };
    customers.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        active: {type: DataTypes.BOOLEAN, defaultValue: true}
    }, {
        sequelize,
        modelName: 'customers',
    });
    return customers;
};