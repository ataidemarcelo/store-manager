const connection = require('./connection');

const selectAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const selectById = async (id) => {
  const [[result]] = await connection.execute(`
    SELECT * FROM StoreManager.products
      WHERE id = ?
  `, [id]);
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product.name],
  );

  return insertId;
};

const updateProduct = async (id, name) => {
  const [result] = await connection.execute(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
  `, [name, id]);

  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  return result;
};

module.exports = {
  selectAll,
  selectById,
  insert,
  updateProduct,
  deleteProduct,
};
