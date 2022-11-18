const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { products, newProduct } = require('./mocks/product.model.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes de unidade do "productModel"', function () {
  describe('Função: "selectAll"', function () {
    it('Verifica se o "connection.execute" é chamado uma vez, e se tem o retorno esperado', async function () {
      sinon.stub(connection, 'execute').resolves([products, []]);
      const expectedResult = products;

      const result = await productModel.selectAll();
      expect(connection.execute).to.have.been.callCount(1);
      expect(result).to.be.deep.equal(expectedResult);
      expect(result).to.be.deep.an('array');
    });
  });

  describe('Função: "selectById"', function () {
    it('Verifica se busca um produto pelo ID', async function () {
      sinon.stub(connection, 'execute').resolves([[products[1]], []]);
      const id = 2;
      const result = await productModel.selectById(id);
      expect(result).to.be.deep.equal(products[1]);
    });
  });

  describe('Função: "insert"', function () {
    it('Verifica se "connection.execute" recebe a "querySQL" e o "value" esperados', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      await productModel.insert(newProduct);

      const expectedQuery = 'INSERT INTO products (name) VALUE (?)';
      const exepctedValue = 'any_product';

      expect(connection.execute).to.have.been.calledWith(
        expectedQuery,
        [exepctedValue]
      );
    });

    it('Verifica se retorna o insertId esperado', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const expectedInsertId = 42;
      const result = await productModel.insert(newProduct);

      expect(result).to.be.equal(expectedInsertId);
    });
  });

  describe('Função: "updateProduct"', function () {
    it('Verifica se "changedRows" é igual a 1', async function () {
      sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);

      const result = await productModel.updateProduct(2, 'Martelo do Batman');

      expect(result.changedRows).to.have.equal(1);
    });

    it('Verifica se "connection.execute" recebe a "querySQL" e o "value" esperados', async function () {
      sinon.stub(connection, 'execute').resolves([]);

      await productModel.updateProduct(2, 'Martelo do Batman');

      const expectedQuery = 'UPDATE StoreManager.products SET name= ? WHERE id= ?';
      const exepctedValue = ['Martelo do Batman', 2];

      expect(connection.execute).to.have.been.calledWith(
        expectedQuery,
        exepctedValue
      );
    });
  });

  afterEach(sinon.restore);
});
