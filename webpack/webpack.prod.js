const base = require('./webpack.base')
const { join } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: base.entry,

  output: Object.assign({}, base.output, {
    path: join(
      __dirname,
      '..',
      'build'
    ),
    filename: '[name].bundle.[chunkhash].js'
  }),

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      })
    ]
  },

  plugins: [
    ...base.plugins,

    new CleanWebpackPlugin(
      ['build'],
      {
        root: join(__dirname, '..'),
        verbose: true
      }
    ),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    })
  ],

  module: {
    rules: [
      base.standardPreLoader,
      base.jsLoader,
      Object.assign({}, base.cssLoader, {
        use: [
          MiniCssExtractPlugin.loader,
          ...base.cssLoader.use.slice(1)
        ]
      })
    ]
  },

  resolve: base.resolve
}
