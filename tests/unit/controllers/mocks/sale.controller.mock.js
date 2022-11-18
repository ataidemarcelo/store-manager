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

const createSaleExpected = {
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

const salesList = [
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

const findSaleByIdExpected = [
  {
    date: "2022-11-18T11:40:26.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-11-18T11:40:26.000Z",
    productId: 2,
    quantity: 10
  }
];

const saleBodyToUpdate = [
  {
    productId: 1,
    quantity: 10
  },
  {
    productId: 2,
    quantity: 50
  }
];

const expectedResultUpdate = {
  saleId: 1,
  itemsUpdated: [
    {
      saleId: 1,
      productId: 1,
      quantity: 10
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 50
    }
  ]
};

module.exports = {
  newSales,
  createSaleExpected,
  salesList,
  findSaleByIdExpected,
  saleBodyToUpdate,
  expectedResultUpdate,
};
