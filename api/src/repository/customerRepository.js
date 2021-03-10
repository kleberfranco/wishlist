const customersDb = require('../dabase').customers;
const exceptionNotFound = require('../exceptions/exceptionNotFound')
const axios = require('axios');

module.exports = {
    async findAll() {
        let customers = await customersDb.findAll()
        if (customers === null) {
            throw new exceptionNotFound("Customers not found!")
        }
        return customers
    },
    async findById(id) {
        let customer = await customersDb.findByPk(id)
        if (customer === null) {
            throw new exceptionNotFound("Customer not found!")
        }
        return customer
    },
    async findByEmail(email) {
        return await customersDb.findOne({where: {email: email}});
    },
    async createByEmail(newCustomer) {
        try {
                const response = await axios.get('http://challenge-api.luizalabs.com/api/product/4bd442b1-4a7d-2475-be97-a7b22a08a024/')
                console.log(response.data);
            } catch (error) {
                console.log(error.response.body);
            }

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