const Joi = require('joi');
const customerRepository = require('../repository/customerRepository')
const wishlistRepository = require('../repository/wishlistRepository')
const EmailInvalid = require('../exceptions/emailInvalid')

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

        await customerRepository.createByEmail(value);
        res.status(201)
        res.end()
    } catch (error) {
        next(error)
    }
};

exports.update = async function (req, res, next) {
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

        let customer = await customerRepository.findByEmail(value.email);
        if (customer !== null && customer.id !== Number(id)) {
            throw new EmailInvalid("Email already registered!")
        }

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
        const id = req.params.id
        // create schema object
        const schema = Joi.object({
            products: Joi.array().required()
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

