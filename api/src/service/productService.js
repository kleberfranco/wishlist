const NotFound = require('../exceptions/notFound');
const axios = require('axios');

module.exports = {
  async findAll(page) {
    if (!page) {
      page = 1;
    }
    return await axios.get(process.env.API_PRODUCTS + '/?page=' + page).
        then((response) => {
          return response.data;
        }).
        catch((error) => {
          throw new NotFound(error.message);
        });
  },
  async findOne(productId) {
    return await axios.get(process.env.API_PRODUCTS + '/' + productId + '/').
        then((response) => {
          return response.data;
        }).
        catch((error) => {
          console.log(error);
          throw new NotFound('Product not found (' + productId + ')');
        });
  },
};
