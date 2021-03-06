const wishlistDb = require('../dabase').wishlists;
const wishlistProdDb = require('../dabase').wishlistProducts;
const customersDb = require('../dabase').customers;
const NotFound = require('../exceptions/notFound');
const productService = require('../service/productService');

module.exports = {
  async findAll(limit, offset) {
    const wishlists = await wishlistDb.findAndCountAll({
      attributes: ['id', 'active'],
      limit: limit,
      offset: offset,
      where: {
        'active': '1',
        '$customer.active$': true,
      },
      include: [
        {
          model: customersDb, as: 'customer',
          required: true,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: wishlistProdDb, as: 'products',
          required: true,
          attributes: ['id', 'product_id', 'active'],
        },
      ],
    });

    if (wishlists.rows === 0) {
      throw new NotFound('Wishlists not found!');
    }
    return wishlists;
  },
  async findById(id) {
    const wishlists = await wishlistDb.findAll({
      attributes: ['id', 'active'],
      where: {
        id: id,
      },
      include: [
        {
          model: customersDb, as: 'customer',
          required: true,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: wishlistProdDb, as: 'products',
          required: true,
          attributes: ['id', 'product_id', 'active'],
        },
      ],
    });
    if (wishlists.length === 0) {
      throw new NotFound('Wishlist not found!');
    }
    return wishlists.length > 0 ? wishlists[0] : {};
  },
  async create(customerId, products) {
    // check products
    for (const productId of products) {
      await productService.findOne(productId);
    }
    let insertProducts = products;
    const wishlists = await this.findByCustomer(customerId);

    if (wishlists.products && wishlists.products.length) {
      const wishlistsId = wishlists.id;
      const wishlistsProducts = await wishlists.products.map(
          (result) => result.dataValues);
      const updateProducts = await wishlistsProducts.filter(function(product) {
        return products.includes(product.product_id);
      });
      if (updateProducts) {
        const updateOnlyIds = updateProducts.map((result) => result.product_id);
        await wishlistProdDb.update({'active': '1'}, {
          where: {
            wishlist_id: wishlistsId,
            product_id: updateOnlyIds,
          },
        });

        insertProducts = await insertProducts.filter(function(product) {
          return !updateOnlyIds.includes(product);
        });
      }
      if (insertProducts.length) {
        const newProducts = insertProducts.map(function(result) {
          return {'wishlist_id': wishlistsId, 'product_id': result};
        });
        await wishlistProdDb.bulkCreate(newProducts);
      }
    } else {
      const newProducts = insertProducts.map(function(result) {
        return {'product_id': result};
      });

      await wishlistDb.create({
        customer_id: customerId,
        products: newProducts,
      }, {
        include: [
          {
            model: wishlistProdDb, as: 'products',
          },
        ],
      });
    }
    return true;
  },
  async findByCustomerProduct(customerId, productId) {
    const wishlist = await wishlistDb.findAll({
      attributes: ['id', 'active'],
      where: {
        'active': '1',
        'customer_id': customerId,
        '$customer.active$': 1,
        '$products.active$': 1,
        '$products.product_id$': productId,
      },
      include: [
        {
          model: customersDb, as: 'customer',
          required: true,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: wishlistProdDb, as: 'products',
          required: true,
        },
      ],
    });
    return wishlist.length > 0 ? wishlist[0] : {};
  },
  async findByCustomer(customerId) {
    const wishlist = await wishlistDb.findAll({
      attributes: ['id', 'active'],
      where: {
        'active': '1',
        'customer_id': customerId,
        '$customer.active$': 1,
      },
      include: [
        {
          model: customersDb, as: 'customer',
          required: true,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: wishlistProdDb, as: 'products',
          required: true,
        },
      ],
    });

    return wishlist.length > 0 ? wishlist[0] : {};
  },
  async update(id, updatewishlist) {
    return wishlistDb.update(updatewishlist, {where: {id: id}});
  },
};
