function _load (tag) {
  // attributes example: { 'data-test': 'new-attribute-here' }
  return function (url, attributes = {}) {
    // This promise will be used by Promise.all to determine success or failure
    return new Promise((resolve, reject) => {
      const element = document.createElement(tag);
      let parent = 'body';
      let attr = 'src';

      // Important success and error for the promise
      element.onload = () => resolve(url);
      element.onerror = () => reject(url); // maybe we should remove the broken node, who knows

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
      }

      // Inject into document to kick off loading
      element[attr] = url;
      Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
      });
      document[parent].appendChild(element);
    });
  };
}

export default {
  css: _load('link'),
  js: _load('script'),
  img: _load('img')
};
