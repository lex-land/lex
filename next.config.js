// next.config.js
'use strict';

const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require('path');
const { pick } = require('lodash');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

const config = withLess(
  withCSS(
    withTypescript({
      webpack: config => {
        const newConfig = { ...config };
        newConfig.plugins = [
          ...config.plugins,
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
          }),
        ];
        return newConfig;
      },
      distDir: 'build/next',
      useFileSystemPublicRoutes: false,

      // 注入到next的环境变量、跟node环境的变量不同
      // https://nextjs.org/blog/next-8/#build-time-environment-configuration
      env: pick(process.env, [
        'CACHE_TTL',
        'SUNMI_PROD_URL',
        'SUNMI_MONGODB_URL',
        'PORT',
        'SUNMI_ENV',
        'BUILD_TAG',
      ]),
      generateEtags: false,
      lessLoaderOptions: {
        paths: [path.resolve(__dirname, 'node_modules')],
        javascriptEnabled: true,
      },
      // analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      // analyzeBrowser: ['browser', 'both'].includes(
      //   process.env.BUNDLE_ANALYZE,
      // ),
      // bundleAnalyzerConfig: {
      //   server: {
      //     analyzerMode: 'static',
      //     reportFilename: '../bundles/server.html',
      //   },
      //   browser: {
      //     analyzerMode: 'static',
      //     reportFilename: '../bundles/client.html',
      //   },
      // },
    }),
  ),
);

// README: next-typescript 始终格式化成 ['ts','tsx']
config.pageExtensions = ['tsx'];

module.exports = config;
