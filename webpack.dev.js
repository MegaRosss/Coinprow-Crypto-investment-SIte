const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { ProvidePlugin } = require('webpack');
// const EjsWebpackPlugin = require('ejs-webpack-plugin');

module.exports = {
  entry: 
   { main: './app.js'},

  output: {
    path: path.resolve(__dirname, 'dev-build'),
    publicPath:'/', 
    filename: 'main.js',
    clean: true

  },
  target : 'node'
  // module: {
  //   rules: [
  //     {
  //       test: /\.ejs$/,
  //       use: [
  //         {
  //           loader: 'ejs-webpack-loader',
  //           options: {
  //             esModule: false,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.css$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         'css-loader',
  //       ],
  //     },
  //   ],
  // },
  // // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     template: './src/index.ejs',
  //   }),
  //   new MiniCssExtractPlugin(),
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: 'src/assets', to: 'assets' },
  //     ],
  //   }),
  //   new ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //   }),
  //   new EjsWebpackPlugin(),
  // ],
};