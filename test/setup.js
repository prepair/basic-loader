require("babel-core/register")({ presets: ["es2015-ie"] });
require("babel-polyfill");

const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  this.sandbox.restore();
});
