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

module.exports = {
  selectAll,
  selectById,
};
