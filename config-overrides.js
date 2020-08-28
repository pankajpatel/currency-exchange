const aliases = require('alias-hq').load('./tsconfig.base.json')

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: (config, env) => ({
    ...config,
    resolve: {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve.alias || {}),
        ...aliases.get('webpack')
      }
    }
  }),
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: (config) => ({
    ...config,
    moduleNameMapper: {
      ...(config.moduleNameMapper || {}),
      ...aliases.get('jest')
    }
  })
}