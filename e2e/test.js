/* eslint-disable no-unused-expressions */
/* global chai, curl */
const { expect } = chai;

describe('basic-loader', function () {
  let load = null;

  before(async () => {
    curl.config({ baseUrl: '../lib' });
    load = await new Promise((resolve) => {
      curl(['basic-loader-amd'], (module) => {
        resolve(module.default);
      });
    });
  });

  it('should load javascript files', async () => {
    expect(window.foo).to.be.undefined;
    await load.js('foo.js');
    expect(window.foo).to.be.true;
    delete window.foo;
  });

  it('should raise a promise error for non-existent javascript files', (done) => {
    load.js('foo-missing.js').catch(() => done());
  });

  it('should load image files', async () => {
    expect(document.getElementsByTagName('img').length).to.equal(0);
    await load.img('bar.png');
    expect(document.getElementsByTagName('img')).to.have.length(1);
  });

  it('should raise a promise error for non-existent image files', (done) => {
    load.img('bar-missing.png').catch(() => done());
  });

  it('should load css files', async () => {
    const target = document.getElementById('css-target');
    expect(getProp(target, 'color')).to.equal('rgb(0, 0, 0)'); // phantom is terribly picky about props
    await load.css('baz.css');
    expect(getProp(target, 'color')).to.equal('rgb(255, 0, 0)');
  });

  it('should raise a promise error for non-existent css files', (done) => {
    load.img('baz-missing.css').catch(() => done());
  });
});

const getProp = (elem, prop) => window.getComputedStyle(elem, null).getPropertyValue(prop);
