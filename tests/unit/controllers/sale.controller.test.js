const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { newSales, createSaleExpected } = require('./mocks/sale.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes de unidade do "productController"', function () {
  describe('POST /sales | "createSale"', function () {
    it('Verifica as funções internas e seus argumentos de "createSale" em caso de sucesso', async function () {
      const res = {};
      const req = {
        body: newSales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'addSale')
        .resolves({ type: null, result: createSaleExpected });

      await saleController.createSale(req, res);

      expect(saleService.addSale).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createSaleExpected);
    });

    it('Verifica as funções internas e seus argumentos de "createSale" em caso de erro', async function () {
      const res = {};
      const req = {
        body: [{}],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const addSaleSpy = sinon.spy(saleService, 'addSale');

      await saleController.createSale(req, res);

      expect(addSaleSpy).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
  });

  afterEach(sinon.restore);
});
