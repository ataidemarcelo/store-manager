const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const {
  sales,
  saleProduct,
  saleId,
  allSalesFromDb,
  selectAllSalesResult,
} = require('./mocks/sale.model.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes de unidade do "saleModel"', function () {
  describe('Função: "selectById"', function () {
    it('Verifica se busca um venda pelo ID', async function () {
      sinon.stub(connection, 'execute').resolves([[sales[1]], []]);
      const id = 2;
      const [result] = await saleModel.selectById(id);
      expect(result).to.be.deep.equal(sales[1]);
    });
  });

  describe('Função: "insertSale"', function () {
    it('Verifica se "connection.execute" recebe a "querySQL" esperada', async function () {
      const executeSpy = sinon.spy(connection, 'execute');

      await saleModel.insertSale();

      const expectedQuery = 'INSERT INTO StoreManager.sales () VALUES ()';

      expect(executeSpy).to.have.been.calledWith(expectedQuery);
    });

    it('Verifica se retorna o insertId esperado', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await saleModel.insertSale();

      const expectedInsertId = 42;

      expect(result).to.be.equal(expectedInsertId);
    });
  });

  describe('Função: "insertSaleProducts"', function () {
    it('Verifica se "connection.execute" recebe a "querySQL" e os parametros esperados', async function () {
      const executeSpy = sinon.spy(connection, 'execute');

      await saleModel.insertSaleProducts(saleId, saleProduct);

      const expectedQuery = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
      const expectedValue = [saleId, saleProduct.productId, saleProduct.quantity];

      expect(executeSpy).to.have.been.calledWith(expectedQuery, expectedValue);
    });

    it('Verifica se retorna o insertId esperado', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await saleModel.insertSaleProducts(saleId, saleProduct);

      const expectedInsertId = 42;

      expect(result).to.be.equal(expectedInsertId);
    });
  });

  describe('Função: "selectAllSales"', function () {
    it('Verifica se o "connection.execute" é chamado uma vez, e se tem o retorno esperado', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesFromDb, []]);

      const result = await saleModel.selectAllSales();

      expect(connection.execute).to.have.been.calledOnce;
      expect(result).to.be.deep.equal(selectAllSalesResult);
      expect(result).to.be.deep.an('array');
    });
  });

  afterEach(sinon.restore);
});
