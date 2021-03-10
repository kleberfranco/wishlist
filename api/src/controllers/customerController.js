const Joi = require('joi');
const axios = require('axios');
const customerRepository = require('../repository/customerRepository')
const wishlistRepository = require('../repository/wishlistRepository')

exports.list = async function (req, res) {
    try {
        let customers = await customerRepository.findAll()
        res.json(customers)
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.listCustomer = async function (req, res) {
    try {
        const id = req.params.id
        let customer = await customerRepository.findById(id)
        res.json(customer)
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.create = async function (req, res) {
    try {
        // create schema object
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required()
        });

        // schema options
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
            errors: {
                wrap: {
                    label: ''
                }
            }
        };

        // validate request body against schema
        const {error, value} = schema.validate(req.body, options);
        if (error) {
            res.status(403)
            res.json({message: `${error.details.map(x => x.message).join(', ')}`});
        }

        const customer = await customerRepository.createByEmail(value);

        res.status(201)
        res.json(customer)
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.update = async function (req, res) {
    try {
        const id = req.params.id
        await customerRepository.findById(id)

        // create schema object
        const schema = Joi.object({
            name: Joi.string().empty(''),
            email: Joi.string().email().empty(''),
            active: Joi.string().empty(''),
        });

        // schema options
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
            errors: {
                wrap: {
                    label: ''
                }
            }
        };
        // validate request body against schema
        const {error, value} = schema.validate(req.body, options);
        if (error) {
            res.status(403)
            res.json({message: `${error.details.map(x => x.message).join(', ')}`});
        }

        customer = await customerRepository.findByEmail(value.email);
        if (customer !== null && customer.id !== Number(id)) {
            throw new Error("Email already registered!")
        }

        res.status(204)
        customerRepository.update(id, value);
        res.end();
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.delete = async function (req, res) {
    try {
        const id = req.params.id
        await customerRepository.findById(id)

        res.status(204)
        customerRepository.update(id, {active: 0});
        res.end();
    } catch (error) {
        res.json({message: error.message})
    }
};

exports.createWishlist = async function (req, res) {
    try {
        const id = req.params.id
        // create schema object
        const schema = Joi.object({
            products: Joi.string().required()
        });

        // schema options
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
            errors: {
                wrap: {
                    label: ''
                }
            }
        };
        // validate request body against schema
        const {error, value} = schema.validate(req.body, options);
        if (error) {
            res.status(403)
            res.json({message: `${error.details.map(x => x.message).join(', ')}`});
        }

        const wishlist = await wishlistRepository.create(id, value.products);
        res.status(201)
        res.json(wishlist)
    } catch (error) {
        res.json({message: error.message})
    }
};


