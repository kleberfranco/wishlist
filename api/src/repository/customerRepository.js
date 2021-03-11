const customersDb = require('../dabase').customers;
const notFound = require('../exceptions/notFound')
const axios = require('axios');

module.exports = {
    async findAll() {
        let customers = await customersDb.findAll()
        if (customers === null) {
            throw new notFound("Customers not found!")
        }
        return customers
    },
    async findById(id) {
        let customer = await customersDb.findByPk(id)
        if (customer === null) {
            throw new notFound("Customer not found!")
        }
        return customer
    },
    async findByEmail(email) {
        return await customersDb.findOne({where: {email: email}});
    },
    async createByEmail(newCustomer) {
        const [customer, created] = await customersDb.findOrCreate({
            where: {email: newCustomer.email},
            defaults: newCustomer
        });

        return customer
    },
    async update(id, updateCustomer) {
        return customersDb.update(updateCustomer, {where: {id: id}});
    }
};