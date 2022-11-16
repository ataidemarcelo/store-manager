const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const errorMapper = require('../../../src/utils/errorMapper');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { productList, productBodyMock } = require('./mocks/product.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes de unidade do "productController"', function () {
  describe('GET /products | Função: "listProducts"', function () {
    it('Verifica as funções internas e seus argumentos de "listProducts" em caso de erro', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: 'EMPTY_LIST', result: 'There is no registered product' });

      sinon.stub(errorMapper, 'mapper').returns(418);

      await productController.listProducts(req, res);

      expect(errorMapper.mapper).to.have.been.calledOnce;
      expect(errorMapper.mapper).to.have.been.calledWith('EMPTY_LIST');
      expect(res.status).to.have.been.calledWith(418);
      expect(res.json).to.have.been.calledWith({ message: 'There is no registered product' });
    });

    it('Verifica as funções internas e seus argumentos de "listProducts" em caso se sucesso', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, result: productList });

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });
  });

  describe('GET /products:id | Função: "getProduct"', function () {
    it('Verifica as funções internas e seus argumentos de "getProduct" em caso de erro', async function () {
      const res = {};
      const req = {
        params: { id: 2 }
      };
      const findByIdReturn = { type: 'PRODUCT_NOT_FOUND', result: 'Product not found' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves(findByIdReturn);

      sinon.stub(errorMapper, 'mapper').returns(404);

      const idExpected = req.params.id;
      const typeExpected = findByIdReturn.type;
      const statusCodeExpected = errorMapper.errorList['PRODUCT_NOT_FOUND'];
      const messageExpected = findByIdReturn.result;

      await productController.getProduct(req, res);

      expect(productService.findById).to.have.been.calledWith(idExpected);
      expect(errorMapper.mapper).to.have.been.calledWith(typeExpected);
      expect(res.status).to.have.been.calledWith(statusCodeExpected);
      expect(res.json).to.have.been.calledWith({ message: messageExpected });
    });

    it('Verifica as funções internas e seus argumentos de "getProduct" em caso se sucesso', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      const findByIdResult = { type: null, result: productList[1] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves(findByIdResult);

      const idExpected = req.params.id;

      await productController.getProduct(req, res);

      expect(productService.findById).to.have.been.calledWith(idExpected);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findByIdResult.result);
    })
  })

  describe('POST /products | "createProduct"', function () {
    it('Verifica as funções internas e seus argumentos de "createProduct" em caso de sucesso', async function () {
      const res = {};
      const req = {
        body: productBodyMock,
      };
      const newProductMock = { id: 1, ...productBodyMock };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'addProduct')
        .resolves({ type: null, result: newProductMock });

      await productController.createProduct(req, res);

      expect(productService.addProduct).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('Verifica as funções internas em caso de erro sem "name"', async function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const addProductSpy = sinon.spy(productService, 'addProduct');

      await productController.createProduct(req, res);

      expect(addProductSpy).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Verifica as funções internas em caso de erro: "name" com menos de 5 caracteres', async function () {
      const res = {};
      const req = {
        body: { name: 'a' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const addProductSpy = sinon.spy(productService, 'addProduct');

      await productController.createProduct(req, res);

      expect(addProductSpy).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long'
      });
    });
  });

  afterEach(sinon.restore);
});
