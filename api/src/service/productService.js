const exceptionNotFound = require('../exceptions/exceptionNotFound')
const productNotFound = require('../exceptions/productNotFound')
const axios = require('axios');

module.exports = {
    async findAll(page = '1') {
        return await axios.get(process.env.API_PRODUCTS + '/?page=' + page)
            .catch(error => {
                throw new productNotFound(error.message);
            })

    },
    async findOne(productId) {
        return await axios.get(process.env.API_PRODUCTS + '/' + productId + '/')
            .catch(error => {
                throw new productNotFound(error.message);
            })
    }
};