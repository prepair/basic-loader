"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _load(tag) {
  // attributes example: { 'data-test': 'new-attribute-here' }
  return function (url) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // This promise will be used by Promise.all to determine success or failure
    return new Promise(function (resolve, reject) {
      var element = document.createElement(tag);
      var parent = 'body';
      var attr = 'src'; // Important success and error for the promise

      element.onload = function () {
        return resolve(url);
      };

      element.onerror = function () {
        return reject(url);
      }; // maybe we should remove the broken node, who knows
      // Need to set different attributes depending on tag type


      switch (tag) {
        case 'script':
          element.async = true;
          break;

        case 'link':
          element.type = 'text/css';
          element.rel = 'stylesheet';
          attr = 'href';
          parent = 'head';
      } // Inject into document to kick off loading


      element[attr] = url;
      Object.keys(attributes).forEach(function (key) {
        element.setAttribute(key, attributes[key]);
      });
      document[parent].appendChild(element);
    });
  };
} // exporting a "default" would render the amd package to work differently


var _default = {
  css: _load('link'),
  js: _load('script'),
  img: _load('img')
};
exports.default = _default;