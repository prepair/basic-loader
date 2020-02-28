# basic-loader

David Walsh's [super simple loader](https://davidwalsh.name/javascript-loader) for loading image, CSS, and JavaScript files.

## installation

```shell
npm i -S @prepair/basic-loader
```

- Requires browser environment (dom).
- Transpiled to es2015+ie context (polyfills not included).

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

## add optional attributes

```
load.js('lib/main.js', {
  'data-foo': 'new-attribute',
  'data-bar': 'new-attribute-2'
})
```

## caveats

- Loading is not sequential of course. In the above example "main.js" may be parsed
  before "highlighter.js". If you want in order loading, use a sequential promise
  executor or a then chain.
- Style loading may not work with very old mobile borwsers.
  [Followup is here](https://github.com/w3core/import.js/issues/2), see addendum below.
- The e2e test runner breaks (in phantom, but the test.html works in the browser)
  this is caused by an old phantomjs version in the _mocha-phantomjs_ package.
  [Issue is here](https://github.com/nathanboktae/mocha-phantomjs/issues/248). Solutions:
  - either wait for the upstream package to be updated
  - or update the binary manually (inside node_modules)

## exposed test

Temporarily the e2e standalone test page has been exposed to [docs](./docs) and is made
available as a [github page](https://prepair.github.io/basic-loader/).
TODO: use browserstack or smg similar?

- [x] Chrome/30 Mobile Safari/537.6 (android 4.4.2), from [2013](https://en.wikipedia.org/wiki/Safari_version_history)
- [x] iOS 10.2.1 (vanilla iphone 6)
- [x] Firefox 51.0.3 (android 4.4.2)
