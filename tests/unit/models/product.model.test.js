const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { products } = require('./mocks/product.model.mocks');

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

  afterEach(sinon.restore);
});
