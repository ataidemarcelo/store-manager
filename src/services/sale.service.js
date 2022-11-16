const { saleModel } = require('../models');
const { validateFields, validateProductExists } = require('./validations/validationsSales');

const addSale = async (sales) => {
  let error = await validateFields(sales);
  if (error.type) return error;

  error = await validateProductExists(sales);
  if (error.type) return error;

  const saleId = await saleModel.insertSale();

  const promisesSalesInsert = sales.map(async (sale) => saleModel.insertSaleProducts(saleId, sale));
  await Promise.all(promisesSalesInsert);

  const saleProducts = await saleModel.selectById(saleId);
  const newSaleProducts = saleProducts.map(({ productId, quantity }) => ({
    productId,
    quantity,
  }));

  const newSales = {
    id: saleId,
    itemsSold: newSaleProducts,
  };

  return { type: null, result: newSales };
};

module.exports = {
  addSale,
};
