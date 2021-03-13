const notFound = require('../exceptions/notFound')
const axios = require('axios');

module.exports = {
    async findAll(page) {
        if (!page) {
            page = 1
        }
        return await axios.get(process.env.API_PRODUCTS + '/?page=' + page)
            .then((response) => {
                return response.data;
            })
            .catch(error => {
                throw new notFound(error.message);
            })

    },
    async findOne(productId) {
        return await axios.get(process.env.API_PRODUCTS + '/' + productId + '/')
            .then((response) => {
                return response.data;
            })
            .catch(error => {
                throw new notFound('Product not found (' + productId + ')');
            })
    }
};