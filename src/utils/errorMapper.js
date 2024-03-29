const errorList = {
  EMPTY_LIST: 418,
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_VALUE: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const mapper = (type) => errorList[type] || 500;

module.exports = {
  errorList,
  mapper,
};
