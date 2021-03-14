const customersDb = require('../dabase').customers;
const NotFound = require('../exceptions/notFound');

module.exports = {
  async findAll(limit, offset) {
    const customers = await customersDb.findAndCountAll(
        {limit: limit, offset: offset});
    if (customers === null) {
      throw new NotFound('Customers not found!');
    }
    return customers;
  },
  async findById(id) {
    const customer = await customersDb.findByPk(id);
    if (customer === null) {
      throw new NotFound('Customer not found!');
    }
    return customer;
  },
  async findByEmail(email) {
    return await customersDb.findOne({where: {email: email}});
  },
  async createByEmail(newCustomer) {
    const [customer] = await customersDb.findOrCreate({
      where: {email: newCustomer.email},
      defaults: newCustomer,
    });

    return customer;
  },
  async update(id, updateCustomer) {
    return customersDb.update(updateCustomer, {where: {id: id}});
  },
};
