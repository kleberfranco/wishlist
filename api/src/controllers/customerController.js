const Joi = require('joi');
const customerRepository = require('../repository/customerRepository')
const wishlistRepository = require('../repository/wishlistRepository')
const validator = require('../service/validator')

exports.list = async function (req, res, next) {
    try {
        let customers = await customerRepository.findAll(req.query.limit, req.skip)
        const itemCount = customers.count;
        const pageCount = Math.ceil(customers.count / req.query.limit);
        res.json( {
            customers: customers.rows,
            pageCount,
            itemCount
        });
    } catch (error) {
        next(error)
    }
};

exports.listCustomer = async function (req, res, next) {
    try {
        const id = req.params.id
        let customer = await customerRepository.findById(id)
        res.json(customer)
    } catch (error) {
        next(error)
    }
};

exports.create = async function (req, res, next) {
    try {
        const value = await validator('createCustomer', req.body);

        await customerRepository.createByEmail(value);
        res.status(201)
        res.end()
    } catch (error) {
        next(error)
    }
};

exports.update = async function (req, res, next) {
    try {
        const value = await validator('updateCustomer', req.body, req.params);
        const id = req.params.id
        await customerRepository.findById(id)

        await customerRepository.update(id, value);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

exports.delete = async function (req, res, next) {
    try {
        const id = req.params.id
        await customerRepository.findById(id)

        await customerRepository.update(id, {active: 0});
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

exports.createWishlist = async function (req, res, next) {
    try {
        const value = await validator('createWishlist', req.body);
        const id = req.params.id
        await customerRepository.findById(id)

        await wishlistRepository.create(id, value.products);
        res.status(201).end()
    } catch (error) {
        next(error)
    }
};

exports.listWishlist = async function (req, res, next) {
    try {
        const id = req.params.id
        let wishlists = await wishlistRepository.findByCustomer(id)
        res.json(wishlists)
    } catch (error) {
        next(error)
    }
};

