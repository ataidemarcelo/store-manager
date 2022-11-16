const newSales = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const newSalesInvalid = [
  {
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const newSalesQuantityInvalid = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 0
  }
];

const newSalesProductIdInvalid = [
  {
    productId: 99999,
    quantity: 1
  },
  {
    productId: 99999,
    quantity: 5
  }
];

const insertSaleResult = [
  {
    productId: 1,
    quantity: 1,
    saleId: 42
  },
  {
    productId: 2,
    quantity: 5,
    saleId: 42
  }
];

const saleAddExpected = {
  id: 42,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    }
  ]
};

module.exports = {
  newSales,
  insertSaleResult,
  saleAddExpected,
  newSalesInvalid,
  newSalesQuantityInvalid,
  newSalesProductIdInvalid,
};
