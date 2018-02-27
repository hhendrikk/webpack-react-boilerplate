const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',

  devtool: 'source-map',

  output: {
    filename: '[name].bundle.[chunkhash].js',
    publicPath: '/build/'
  },

  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
})
