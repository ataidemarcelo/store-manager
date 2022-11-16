const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleModel, productModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const {
  newSales,
  insertSaleResult,
  saleAddExpected,
  newSalesInvalid,
  newSalesQuantityInvalid,
  newSalesProductIdInvalid,
} = require('./mocks/sale.service.mocks');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade de "saleService"', function () {
  describe('Função: "addSale"', function () {
    it('Verifica o cadastro de uma venda com campo quantity inválido', async function () {
      const result = await saleService.addSale(newSalesQuantityInvalid);

      expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
      expect(result.result).to.deep.equal('"quantity" must be greater than or equal to 1');
    });

    it('Verifica o cadastro de uma venda sem o campo productId', async function () {
      const result = await saleService.addSale(newSalesInvalid);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.result).to.deep.equal('"productId" is required');
    });

    it('Verifica o cadastro de uma venda com productId inválido', async function () {
      sinon.stub(productModel, 'selectById')
        .onFirstCall().resolves(undefined)
        .onSecondCall().resolves(undefined);

      const result = await saleService.addSale(newSalesProductIdInvalid);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.result).to.deep.equal('Product not found');
    });

    it('Verifica o cadastro de uma venda com valores válidos', async function () {
      sinon.stub(saleModel, 'insertSale').resolves(42);
      sinon.stub(saleModel, 'insertSaleProducts').resolves();
      sinon.stub(saleModel, 'selectById').resolves(insertSaleResult);

      const result = await saleService.addSale(newSales);

      expect(result.type).to.equal(null);
      expect(result.result).to.deep.equal(saleAddExpected);
    });
  });

  afterEach(sinon.restore);
});
