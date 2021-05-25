require('babel-core/register')({ presets: ['es2015-ie'] });
require('babel-polyfill');

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

exports.mochaHooks = {};
