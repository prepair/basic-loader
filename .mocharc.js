exports = module.exports = {
  colors: true,
  extension: ["js"],
  require: ["test/setup.js"],
  // don't use this, otherwise we can't run mocha on a single file etc from command line, IDE etc.
  // spec: ['app/**/*.spec.js']
};
