# basic-loader

David Walsh's [super simple loader](https://davidwalsh.name/javascript-loader) for loading image, CSS, and JavaScript files.

## installation

```shell
npm i -S @prepair/basic-loader
```

* Requires browser environment (dom).
* Transpiled to es2015+ie context (polyfills not included).

## usage

```
import load from '@prepair/basic-loader'

Promise.all([
  load.js('lib/highlighter.js'), 
  load.js('lib/main.js'), 
  load.css('lib/highlighter.css'),
  load.img('images/logo.png')
]).then(() => {
  console.log('Everything has loaded!');
}).catch(err => {
  console.log('Oh no, epic failure!');
});
```

## caveats

* Loading is not sequential
* Style loading may not work with mobile borwsers or in old Safari?
  [Followup is here](https://github.com/w3core/import.js/issues/2).
* The e2e test runner breaks (in phantom, but the test.html works in the browser)
  this is caused by an old phantomjs version in the _mocha-phantomjs_ package.
  [Issue is here](https://github.com/nathanboktae/mocha-phantomjs/issues/248)
  * either wait for the upstream package to be updated 
  * or update the binary manually

## exposed test

Temporarily the e2e standalone test page has been exposed to [docs](./docs) and is made
available as a github page. TODO: browserstack?
