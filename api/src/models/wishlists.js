'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `database/index` file will call this method automatically.
     */
    static associate(models) {
      // wishlists.belongsTo(models.customers, {foreignKey: 'customer', as: 'customers'})
      wishlists.hasMany(models.wishlistProducts, {foreignKey: 'wishlist_id', as: 'products'}),
      wishlists.belongsTo(models.customers, {foreignKey: 'customer_id', as: 'customer'})
    }
  }
  wishlists.init({
    customer_id: DataTypes.INTEGER,
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
  }, {
    sequelize,
    modelName: 'wishlists',
  });
  return wishlists;
};