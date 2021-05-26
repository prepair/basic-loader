"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BODY = 'body';
var HEAD = 'head';
var tagToUrlAttribute = {
  script: 'src',
  link: 'href',
  img: 'src'
};

var _load = function _load(tag) {
  // attributes example: { 'data-test': 'new-attribute-here' }
  return function (url) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // this promise will be used by Promise.all to determine success or failure
    return new Promise(function (resolve, reject) {
      // need to set different attributes depending on tag type
      var _tagToTagDetailsFuncs = tagToTagDetailsFuncs[tag](url, attributes),
          parent = _tagToTagDetailsFuncs.parent,
          tagAttributes = _tagToTagDetailsFuncs.attributes;

      if (isAlreadyLoaded(tag, tagAttributes)) return resolve(url);
      var element = document.createElement(tag);

      element.onload = function () {
        return resolve(url);
      };

      element.onerror = function () {
        return reject(url);
      }; // maybe we should remove the broken node, who knows


      Object.keys(tagAttributes).forEach(function (name) {
        return element.setAttribute(name, tagAttributes[name]);
      }); // inject into document to kick off loading

      document[parent].appendChild(element);
    });
  };
};

var isAlreadyLoaded = function isAlreadyLoaded(tag, attributes) {
  var urlAttribute = tagToUrlAttribute[tag];
  var url = attributes[urlAttribute];
  var rel = attributes.rel || ''; // script[src="some-url"]
  // link[href="some-url"][rel="stylesheet"]
  // img[src="some-url"]

  return Boolean(document.querySelector("".concat(tag, "[").concat(urlAttribute, "=\"").concat(url, "\"]").concat(rel ? "[rel=\"".concat(rel, "\"]") : '')));
};

var getScriptTagDetails = function getScriptTagDetails(url, attributes) {
  var hasNoAsyncOrDefer = !('async' in attributes || 'defer' in attributes);
  return {
    parent: BODY,
    attributes: _objectSpread(_objectSpread({
      src: url
    }, hasNoAsyncOrDefer && {
      async: ''
    }), attributes)
  };
};

var getLinkTagDetails = function getLinkTagDetails(url, attributes) {
  return {
    parent: HEAD,
    attributes: _objectSpread({
      href: url,
      type: 'text/css',
      rel: 'stylesheet'
    }, attributes)
  };
};

var getImgTagDetails = function getImgTagDetails(url, attributes) {
  return {
    parent: BODY,
    attributes: _objectSpread({
      src: url
    }, attributes)
  };
};

var tagToTagDetailsFuncs = {
  script: getScriptTagDetails,
  link: getLinkTagDetails,
  img: getImgTagDetails
};
var _default = {
  css: _load('link'),
  js: _load('script'),
  img: _load('img')
};
exports.default = _default;