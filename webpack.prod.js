const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'build', `production_created_${new Date().toISOString()}`),
    filename: '[name].bundle.[chunkhash].js'
  },

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
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    })
  ],

  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
      loader: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  }
})
