const _load = (tag) => {
  // attributes example: { 'data-test': 'new-attribute-here' }
  return (url, attributes = {}) => {
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

      element[attr] = url;
      Object.keys(attributes).forEach((name) => element.setAttribute(name, attributes[name]));

      // Inject into document to kick off loading
      document[parent].appendChild(element);
    });
  };
};

export default {
  css: _load('link'),
  js: _load('script'),
  img: _load('img'),
};
