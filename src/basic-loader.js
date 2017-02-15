function _load (tag) {
  return function (url) {
    // This promise will be used by Promise.all to determine success or failure
    return new Promise((resolve, reject) => {
      let element = document.createElement(tag);
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
      document[parent].appendChild(element);
    });
  };
}

// exporting a "default" would render the amd package to work differently
module.exports = {
  css: _load('link'),
  js: _load('script'),
  img: _load('img')
};
