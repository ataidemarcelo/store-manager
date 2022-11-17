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

const select = async (id) => {
  const [result] = await connection.execute(
    ` SELECT *
      FROM StoreManager.sales
      WHERE id = ?`,
    [id],
  );
  return result;
};

const insertSaleProducts = async (saleId, sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, sales.productId, sales.quantity],
  );

  return insertId;
};

const selectAllSales = async () => {
  const [result] = await connection.execute(`
    SELECT
      sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales as s
    ON sp.sale_id = s.id
    ORDER BY sale_id, product_id
  `);

  return camelize(result);
};

const selectSaleById = async (id) => {
  const [result] = await connection.execute(`
    SELECT
      s.date, sp.product_id, sp.quantity
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales as s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
  `, [id]);

  return camelize(result);
};

const deleteSale = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  return result;
};

const updateSale = async (id, { quantity, productId }) => {
  const [result] = await connection.execute(`
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE product_id = ? AND sale_id = ?
  `, [quantity, productId, id]);

  return result;
};

module.exports = {
  insertSaleProducts,
  selectById,
  insertSale,
  selectAllSales,
  selectSaleById,
  deleteSale,
  updateSale,
  select,
};
