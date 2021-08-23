// Internals
const {aliases, reactSvgLoaderRule} = require('./webpack/config');

// Next config
module.exports = {
  webpack(config, {defaultLoaders}) {
    // React SVG Loader
    config.module.rules.push(reactSvgLoaderRule(defaultLoaders.babel));

    // Aliases for paths to app directories
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases(),
    };

    return config;
  },
};
