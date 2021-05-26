/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import * as sinon from 'sinon';
import load from './basic-loader';

describe('basic-loader', () => {
  beforeEach(function () {
    global.document = {
      body: { appendChild: sinon.fake() },
      head: { appendChild: sinon.fake() },
      createElement: sinon.fake.returns({ setAttribute: sinon.fake() }),
      querySelector: sinon.stub(),
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
    const result = load.css('foo.css');
    expect(result).to.be.an.instanceOf(Promise);
  });

  it('should return a promise for inserting js', () => {
    const result = load.js('bar.js');
    expect(result).to.be.an.instanceOf(Promise);
  });

  it('should return a promise for inserting images', () => {
    const result = load.img('baz.jpg');
    expect(result).to.be.an.instanceOf(Promise);
  });

  it('should append <link> tag with default attributes for inserting css', () => {
    load.css('foo.css');
    expect(document.head.appendChild).to.have.been.calledOnce;
    const element = document.head.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([
      ['href', 'foo.css'],
      ['type', 'text/css'],
      ['rel', 'stylesheet'],
    ]);
  });

  it('should append <script> tag with default attributes for inserting js', () => {
    load.js('bar.js');
    expect(document.body.appendChild).to.have.been.calledOnce;
    const element = document.body.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([
      ['src', 'bar.js'],
      ['async', ''],
    ]);
  });

  it('should append <img> tag with default attributes for inserting img', () => {
    load.img('baz.jpg');
    expect(document.body.appendChild).to.have.been.calledOnce;
    const element = document.body.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([['src', 'baz.jpg']]);
  });

  it('should add custom attributes for inserting css', () => {
    load.css('foo.css', { dummy1: 'value1', dummy2: 'value2' });
    expect(document.head.appendChild).to.have.been.calledOnce;
    const element = document.head.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([
      ['href', 'foo.css'],
      ['type', 'text/css'],
      ['rel', 'stylesheet'],
      ['dummy1', 'value1'],
      ['dummy2', 'value2'],
    ]);
  });

  it('should add custom attributes for inserting js', () => {
    load.js('bar.js', { dummy1: 'value1', dummy2: 'value2' });
    expect(document.body.appendChild).to.have.been.calledOnce;
    const element = document.body.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([
      ['src', 'bar.js'],
      ['async', ''],
      ['dummy1', 'value1'],
      ['dummy2', 'value2'],
    ]);
  });

  it('should add custom attributes for inserting img', () => {
    load.img('baz.jpg', { dummy1: 'value1', dummy2: 'value2' });
    expect(document.body.appendChild).to.have.been.calledOnce;
    const element = document.body.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([
      ['src', 'baz.jpg'],
      ['dummy1', 'value1'],
      ['dummy2', 'value2'],
    ]);
  });

  it('should not add default `async` attribute when `defer` provided for inserting js', () => {
    load.js('bar.js', { defer: '' });
    expect(document.body.appendChild).to.have.been.calledOnce;
    const element = document.body.appendChild.firstCall.args[0];
    expect(element.setAttribute.args).to.eql([
      ['src', 'bar.js'],
      ['defer', ''],
    ]);
  });

  it('should not append <link> tag when already loaded for inserting css', () => {
    global.document.querySelector.returns(true);
    load.css('foo.css');
    expect(document.head.appendChild).to.have.not.been.called;
  });

  it('should append <script> tag with default attributes for inserting js', () => {
    global.document.querySelector.returns(true);
    load.js('bar.js');
    expect(document.body.appendChild).to.have.not.been.called;
  });

  it('should append <img> tag with default attributes for inserting img', () => {
    global.document.querySelector.returns(true);
    load.img('baz.jpg');
    expect(document.body.appendChild).to.have.not.been.called;
  });

  it('should consider `rel` in already loaded check for inserting css', () => {
    load.css('foo.css');
    expect(global.document.querySelector).to.have.been.calledOnce;
    expect(global.document.querySelector.firstCall.args).to.eql(['link[href="foo.css"][rel="stylesheet"]']);
  });

  it('should not include `rel` in already loaded check for inserting js', () => {
    load.js('bar.js');
    expect(global.document.querySelector).to.have.been.calledOnce;
    expect(global.document.querySelector.firstCall.args).to.eql(['script[src="bar.js"]']);
  });

  it('should not include `rel` in already loaded check for inserting img', () => {
    load.img('baz.jpg');
    expect(global.document.querySelector).to.have.been.calledOnce;
    expect(global.document.querySelector.firstCall.args).to.eql(['img[src="baz.jpg"]']);
  });
});
