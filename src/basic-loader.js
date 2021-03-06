const BODY = 'body';
const HEAD = 'head';

const tagToUrlAttribute = {
  script: 'src',
  link: 'href',
  img: 'src',
};

const _load = (tag) => {
  // attributes example: { 'data-test': 'new-attribute-here' }
  return (url, attributes = {}) => {
    // this promise will be used by Promise.all to determine success or failure
    return new Promise((resolve, reject) => {
      // need to set different attributes depending on tag type
      const { parent, attributes: tagAttributes } = tagToTagDetailsFuncs[tag](url, attributes);
      if (isAlreadyLoaded(tag, tagAttributes)) return resolve(url);

      const element = document.createElement(tag);
      element.onload = () => resolve(url);
      element.onerror = () => reject(url); // maybe we should remove the broken node, who knows
      Object.keys(tagAttributes).forEach((name) => element.setAttribute(name, tagAttributes[name]));
      // inject into document to kick off loading
      document[parent].appendChild(element);
    });
  };
};

const isAlreadyLoaded = (tag, attributes) => {
  const urlAttribute = tagToUrlAttribute[tag];
  const url = attributes[urlAttribute];
  const rel = attributes.rel || '';

  // script[src="some-url"]
  // link[href="some-url"][rel="stylesheet"]
  // img[src="some-url"]
  return Boolean(document.querySelector(`${tag}[${urlAttribute}="${url}"]${rel ? `[rel="${rel}"]` : ''}`));
};

const getScriptTagDetails = (url, attributes) => {
  const hasNoAsyncOrDefer = !('async' in attributes || 'defer' in attributes);
  return {
    parent: BODY,
    attributes: {
      src: url,
      ...(hasNoAsyncOrDefer && { async: '' }),
      ...attributes,
    },
  };
};

const getLinkTagDetails = (url, attributes) => {
  return {
    parent: HEAD,
    attributes: {
      href: url,
      type: 'text/css',
      rel: 'stylesheet',
      ...attributes,
    },
  };
};

const getImgTagDetails = (url, attributes) => {
  return {
    parent: BODY,
    attributes: {
      src: url,
      ...attributes,
    },
  };
};

const tagToTagDetailsFuncs = {
  script: getScriptTagDetails,
  link: getLinkTagDetails,
  img: getImgTagDetails,
};

export default {
  css: _load('link'),
  js: _load('script'),
  img: _load('img'),
};
