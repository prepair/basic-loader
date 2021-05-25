module.exports = function (api) {
  const isTestEnv = api.env('test');
  api.cache(false);
  const modules = process.env.MODULES || 'cjs';
  const presets = [
    [
      '@babel/preset-env',
      {
        modules,
        targets: isTestEnv ? 'current node' : 'defaults, IE 11, iOS >= 9, Android >= 4'
      }
    ]
  ];
  return {
    presets
  };
};
