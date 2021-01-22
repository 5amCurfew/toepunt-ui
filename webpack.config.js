/* eslint-disable new-cap */
const path = require('path');
// eslint-disable-next-line import/no-unresolved
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/ctrl.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },

  devServer: {
    contentBase: './dist',
  },

  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
