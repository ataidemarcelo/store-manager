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

module.exports = {
  newSales,
  createSaleExpected,
};
