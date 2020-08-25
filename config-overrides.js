const aliases = require('alias-hq')

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    return {
      ...config,
      resolve: {
        ...(config.resolve || {}),
        alias: {
          ...(config.resolve.alias || {}),
          ...aliases.load('tsconfig.base.json').get('webpack')
        }
      }
    }
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function(config) {
    config.moduleNameMapper = {
      ...(config.moduleNameMapper || {}),
      ...aliases.load('tsconfig.base.json').get('jest')
    }
    return config;
  }
}