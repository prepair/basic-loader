require('babel-core/register')({ presets: ['es2015-ie'] });
require('babel-polyfill');

const sinon = require('sinon');
const mocha = require('mocha');
const coMocha = require('co-mocha');
const chai = require('chai');
const sinonChai = require('sinon-chai');

coMocha(mocha);
chai.use(sinonChai);

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  this.sandbox.restore();
});
