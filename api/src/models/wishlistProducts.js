'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlistProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `database/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wishlistProducts.hasMany(models.wishlists, {foreignKey: 'wishlist_id', as: 'products'})
    }
  };
  wishlistProducts.init({
    wishlist_id: DataTypes.INTEGER,
    product_id: DataTypes.STRING,
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
  }, {
    sequelize,
    modelName: 'wishlistProducts',
  });
  return wishlistProducts;
};