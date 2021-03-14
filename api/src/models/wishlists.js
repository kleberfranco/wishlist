'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Model wishlists
   */
  class wishlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `database/index` file will call this method automatically.
     * @param {Model} models
     */
    static associate(models) {
      wishlists.hasMany(models.wishlistProducts,
          {foreignKey: 'wishlist_id', as: 'products'}),
      wishlists.belongsTo(models.customers,
          {foreignKey: 'customer_id', as: 'customer'});
    }
  }

  wishlists.init({
    customer_id: DataTypes.INTEGER,
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
  }, {
    sequelize,
    modelName: 'wishlists',
  });
  return wishlists;
};
