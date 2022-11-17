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
  findAllSalesResult,
  emptyList,
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

  describe('Função: "findAllSales"', function () {
    it('Verifica se "findAllSales" retorna a lista completa das vendas', async function () {
      sinon.stub(saleModel, 'selectAllSales').resolves(findAllSalesResult);

      const sales = await saleService.findAllSales();

      expect(sales.type).to.be.equal(null);
      expect(sales.result.length).to.be.equal(2);
      expect(sales.result).to.be.equal(findAllSalesResult);
    });

    it('Verifica o retorno de "findAllSales" quando recebe uma lista vazia', async function () {
      sinon.stub(saleModel, 'selectAllSales').resolves(emptyList);

      const sales = await saleService.findAllSales();

      expect(sales.type).to.deep.equal('EMPTY_LIST');
      expect(sales.result).to.deep.equal('There is no registered sale');
    });
  });

  afterEach(sinon.restore);
});
