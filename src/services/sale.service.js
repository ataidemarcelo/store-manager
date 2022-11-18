const { saleModel } = require('../models');
const { validateFields, validateProductExists } = require('./validations/validationsSales');
const { validateId } = require('./validations/validationsProducts');

const addSale = async (sales) => {
  let error = validateFields(sales);
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
    itemsSold: [...newSaleProducts],
  };
  return { type: null, result: newSales };
};

const findAllSales = async () => {
  const sales = await saleModel.selectAllSales();

  if (sales.length === 0) {
    return {
      type: 'EMPTY_LIST',
      result: 'There is no registered sale',
    };
  }

  return { type: null, result: sales };
};

const findSaleById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const sale = await saleModel.selectSaleById(id);

  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', result: 'Sale not found' };

  return { type: null, result: sale };
};

const deleteSale = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const sales = await saleModel.selectById(id);

  if (sales.length === 0) return { type: 'SALE_NOT_FOUND', result: 'Sale not found' };

  await saleModel.deleteSale(id);

  return { type: null };
};

const updateSale = async (id, sales) => {
  let error = validateId(id);
  if (error.type) return error;

  error = await validateFields(sales);
  if (error.type) return error;

  error = await validateProductExists(sales);
  if (error.type) return error;

  const result = await saleModel.select(id);
  if (result.length === 0) {
    return { type: 'SALE_NOT_FOUND', result: 'Sale not found' };
  }

  const promisesSalesUpdate = sales.map(async (sale) => saleModel.updateSale(id, sale));
  await Promise.all(promisesSalesUpdate);

  const updatedSale = await saleModel.selectById(id);

  const updated = {
    saleId: id,
    itemsUpdated: updatedSale,
  };

  return { type: null, result: updated };
};

module.exports = {
  addSale,
  findAllSales,
  findSaleById,
  deleteSale,
  updateSale,
};
