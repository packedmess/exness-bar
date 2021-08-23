const path = require('path');

/**
 * Aliases for Webpack alias resolver
 */
const aliases = () => ({
  '@': process.cwd(),
});

/**
 * @see https://github.com/svg/svgo/blob/master/README.ru.md
 */
const svgoConfig = () => ({
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: false,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: false,
    },
    {
      convertStyleToAttrs: false,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: false,
    },
    {
      removeUnknownsAndDefaults: false,
    },
    {
      removeNonInheritableGroupAttrs: false,
    },
    {
      removeUselessStrokeAndFill: false,
    },
    {
      removeUnusedNS: false,
    },
    {
      cleanupIDs: false,
    },
    {
      cleanupNumericValues: false,
    },
    {
      moveElemsAttrsToGroup: false,
    },
    {
      moveGroupAttrsToElems: false,
    },
    {
      collapseGroups: false,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: false,
    },
    {
      removeDimensions: false,
    },
    {
      removeAttrs: false,
    },
    {
      prefixIds: true,
    },
  ],
});

/**
 * @see https://github.com/storybookjs/storybook/issues/7360#issuecomment-538799239
 * @param rules {Array<object>}
 * @returns {Array<object>}
 */
const svgExcludeRuleFromStorybookLoaders = rules => {
  return rules.map(rule => {
    if (rule.test.test('.svg')) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      };
    }
    return rule;
  });
};

/**
 * Shared react-svg-loader rule
 * @see https://www.npmjs.com/package/react-svg-loader
 * @param defaultBabelLoader {string}
 * @returns {{include: string, test: RegExp, use: [*, {loader: string, options: {svgo: {plugins}, jsx: boolean}}]}}
 */
const reactSvgLoaderRule = defaultBabelLoader => ({
  test: /\.svg$/,
  include: path.resolve(process.cwd(), 'public', 'assets', 'icons'),
  use: [
    defaultBabelLoader,
    {
      loader: 'react-svg-loader',
      options: {
        jsx: false, // true outputs JSX tags
        svgo: svgoConfig(),
      },
    },
  ],
});

module.exports = {
  svgoConfig,
  svgExcludeRuleFromStorybookLoaders,
  reactSvgLoaderRule,
  aliases,
};
