const path = require('path');

const uuid = require('uuid');

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const pkg = require('./package.json');

const production = process.env.NODE_ENV === 'production';
const version = production && pkg.version ? pkg.version : uuid.v1();

function babelConfig(addPlugins = [], addPresets = []) {
  return {
    presets: [
      ['@babel/preset-env', {
        targets: 'last 2 Firefox versions, last 2 Chrome versions, last 2 ChromeAndroid versions, last 2 iOS major versions, last 2 KaiOS versions',
      }],
      ...addPresets,
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        corejs: 3,
        useESModules: true,
      }],
      ...addPlugins,
    ],
  };
}

module.exports = {
  mode: production ? 'production' : 'development',
  entry: {
    index: './index.jsx',
    sw: './sw.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      if (chunkData.chunk.name === 'sw') {
        return 'assets/sw.js';
      }

      if (production) {
        return 'assets/[contenthash].js';
      }

      return 'assets/[name].bundle.js';
    },
    chunkFilename: production ? 'assets/[contenthash].js' : 'assets/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig(),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig([['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }]]),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CACHENET_VERSION': JSON.stringify(version),
    }),
    new HtmlWebpackPlugin({
      title: 'CacheNet',
      template: './index.ejs',
    }),
    new PreloadWebpackPlugin(),
    new WebpackPwaManifest({
      inject: true,
      ios: true,
      filename: 'assets/manifest.webmanifest',
      includeDirectory: true,

      name: 'CacheNet',
      short_name: 'CacheNet',
      start_url: '.',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#fff',
      theme_color: '#000',
      description: 'The web client for CacheNet',
    }),
    new CompressionPlugin(),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
    }),
  ].filter((x) => x),
  devtool: production ? false : 'eval-source-map',
  optimization: {
    noEmitOnErrors: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
  },
};
