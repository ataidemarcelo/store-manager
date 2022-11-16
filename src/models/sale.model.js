const camelize = require('camelize');

const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  return insertId;
};

const selectById = async (id) => {
  const [result] = await connection.execute(
    ` SELECT *
      FROM StoreManager.sales_products
      WHERE sale_id = ?`,
    [id],
  );
  return camelize(result);
};

const insertSaleProducts = async (saleId, sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, sales.productId, sales.quantity],
  );

  return insertId;
};

module.exports = {
  insertSaleProducts,
  selectById,
  insertSale,
};
