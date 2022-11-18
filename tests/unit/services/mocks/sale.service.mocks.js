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

const findAllSalesResult = [
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

const findSaleByIdResult = [
  {
    date: "2022-11-18T11:40:26.000Z",
    productId: 1,
    quantity: 10
  },
  {
    date: "2022-11-18T11:40:26.000Z",
    productId: 2,
    quantity: 50
  }
]

const emptyList = [];

module.exports = {
  newSales,
  insertSaleResult,
  saleAddExpected,
  newSalesInvalid,
  newSalesQuantityInvalid,
  newSalesProductIdInvalid,
  findAllSalesResult,
  findSaleByIdResult,
  emptyList,
};
