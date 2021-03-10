const wishlistDb = require('../dabase').wishlists;
const wishlistProdDb = require('../dabase').wishlistProducts;
const customersDb = require('../dabase').customers;
const exceptionNotFound = require('../exceptions/exceptionNotFound')
const productNotFound = require('../exceptions/productNotFound')
const productService = require('../service/productService')

module.exports = {
    async findAll() {
        let wishlists = await wishlistDb.findAll({
            attributes: ['id', 'active'],
            where: {
                active: '1',
                '$customer.active$': 1,
                '$products.active$': 1,
            },
            include: [
                {
                    model: customersDb, as: 'customer',
                    required: true,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: wishlistProdDb, as: 'products',
                    required: true,
                    attributes: ['id', 'product_id', 'active']
                }
            ]
        })

        if (wishlists === null) {
            throw new exceptionNotFound("Wishlists not found!")
        }
        return wishlists
    },
    async create(customerId, productId) {
        const product = await productService.findOne(productId)
        let wishlists = await this.findByCustomer(customerId);

        if (wishlists.products && wishlists.products.length) {
            let products = wishlists.products.map(result => result.dataValues)
            let checkProducts = await products.filter(function (product) {
                return product.product_id === productId
            });
            if (checkProducts.length === 0) {
                let newProduct = await wishlistProdDb.create({wishlist_id: wishlists.id, product_id: productId})
                wishlists.products.push(newProduct)
            } else {
                await wishlistProdDb.update({'active': '1'}, {
                    where: {
                        wishlist_id: wishlists.id,
                        product_id: productId
                    }
                });
            }
            return wishlists
        } else {
            await wishlistDb.create({
                customer_id: customerId,
                products: [
                    {product_id: productId}
                ]
            }, {
                include: [
                    {
                        model: wishlistProdDb, as: 'products'
                    }
                ]
            });
            return await this.findByCustomer(customerId);
        }
    },
    async findByCustomerProduct(customerId, productId) {
        let wishlist = await wishlistDb.findAll({
            attributes: ['id', 'active'],
            where: {
                active: '1',
                customer_id: customerId,
                '$customer.active$': 1,
                '$products.active$': 1,
                '$products.product_id$': productId,
            },
            include: [
                {
                    model: customersDb, as: 'customer',
                    required: true,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: wishlistProdDb, as: 'products',
                    required: true
                }
            ]
        });
        return wishlist.length > 0 ? wishlist[0] : {}
    },
    async findByCustomer(customerId) {
        let wishlist = await wishlistDb.findAll({
            attributes: ['id', 'active'],
            where: {
                active: '1',
                customer_id: customerId,
                '$customer.active$': 1
            },
            include: [
                {
                    model: customersDb, as: 'customer',
                    required: true,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: wishlistProdDb, as: 'products',
                    required: true
                }
            ],
            //group: ['id']
        });

        return wishlist.length > 0 ? wishlist[0] : {}
    }
};