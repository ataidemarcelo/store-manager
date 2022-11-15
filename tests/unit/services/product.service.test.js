const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { emptyList, allProducts, invalidValue, product } = require('./mocks/product.service.mocks');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade de "productService"', function () {
  describe('Função: "findAll', function () {
    it('Verifica o retorno de "findAll" quando recebe uma lista vazia', async function () {
      sinon.stub(productModel, 'selectAll').resolves(emptyList);

      const products = await productService.findAll();

      expect(products.type).to.deep.equal('EMPTY_LIST');
      expect(products.result).to.deep.equal('There is no registered product');
    });

    it('Verifica se "findAll" retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'selectAll').resolves(allProducts);

      const products = await productService.findAll();

      expect(products.result.length).to.be.equal(2);
      expect(products.result).to.deep.equal(allProducts);
    });
  });

  describe('Função: "findById"', function () {
    it('Verifica se retorna um erro caso receba um ID inválido', async function () {
      const result = await productService.findById(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.result).to.equal('"id" must be a number');
    });

    it('Verifica se retorna um erro caso o Id não exista', async function () {
      sinon.stub(productModel, 'selectById').resolves(undefined);

      const nonExistentId = 9999;
      const result = await productService.findById(nonExistentId);
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.result).to.be.equal('Product not found');
    });

    it('Verifica se "selectById" é chamdo internamente e com o id esperado', async function () {
      const selectByIdSpy = sinon.spy(productModel, 'selectById');

      const validId = 2;
      await productService.findById(validId);

      expect(selectByIdSpy).to.have.calledOnce;
      expect(selectByIdSpy).to.have.been.calledWith(validId);
    });

    it('Verifica se retorna "null" e o produto esperado', async function () {
      sinon.stub(productModel, 'selectById').resolves(allProducts[1]);
      const expectedResult = allProducts[1];

      const validId = 2;
      const result = await productService.findById(validId);

      expect(result.type).to.be.equal(null);
      expect(result.result).to.be.deep.equal(expectedResult);
    });
  })

  describe('Função: "addProduct"', function () {
    it('Verifica o cadastro de um produto com valor válido', async function () {
      const newProductMock = { id: 42, ...product };

      sinon.stub(productModel, 'insert').resolves(42);
      sinon.stub(productModel, 'selectById').resolves(newProductMock);

      const result = await productService.addProduct(product);

      expect(result.type).to.equal(null);
      expect(result.result).to.deep.equal(newProductMock);
    });

    it('Verifica se retorna um erro ao passar o "name" com menos de 5 caracteres', async function () {
      const producInvalid = { name: 'a' };

      const result = await productService.addProduct(producInvalid);

      expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
      expect(result.result).to.deep.equal('"name" length must be at least 5 characters long');
    });

    it('Verifica se retorna um erro ao passar um produto inválido', async function () {
      const producInvalid = {};

      const result = await productService.addProduct(producInvalid);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.result).to.deep.equal('"name" is required');
    });
  });

  afterEach(sinon.restore);
});
