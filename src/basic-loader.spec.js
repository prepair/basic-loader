import { expect } from 'chai';
import { spy } from 'sinon';
import load from './basic-loader';

describe('basic-loader', () => {
  beforeEach(function () {
    let getSpy = () => spy(() => ({}));
    global.document = {
      body: { appendChild: getSpy() },
      head: { appendChild: getSpy() },
      createElement: getSpy()
    };
  });

  afterEach(function () {
    delete global.document;
  });

  it('should expose an interface', () => {
    expect(load.css).to.be.a('function');
    expect(load.js).to.be.a('function');
    expect(load.img).to.be.a('function');
  });

  it('should return a promise for inserting css', () => {
    let result = load.css('foo.css');
    expect(result).to.be.an.instanceOf(Promise);
    expect(document.head.appendChild).to.have.been.called;
  });

  it('should return a promise for inserting js', () => {
    let result = load.js('bar.js');
    expect(result).to.be.an.instanceOf(Promise);
    expect(document.body.appendChild).to.have.been.called;
  });

  it('should return a promise for inserting images', () => {
    let result = load.img('baz.jpg');
    expect(result).to.be.an.instanceOf(Promise);
    expect(document.body.appendChild).to.have.been.called;
  });
});