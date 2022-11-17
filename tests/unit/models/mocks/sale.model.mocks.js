const sales = [
  {
    id: 1,
    date: "2022-11-16 14:57:59"
  },
  {
    id: 2,
    name: "2022-11-16 14:57:59"
  }
];

const saleProduct = {
  productId: 2,
  quantity: 5
};

const saleId = 2;

const allSalesFromDb = [
  {
    sale_id: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  },
  {
    sale_id: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2
  }
];

const selectAllSalesResult = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

module.exports = {
  sales,
  saleProduct,
  saleId,
  allSalesFromDb,
  selectAllSalesResult,
};
