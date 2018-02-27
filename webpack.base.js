const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: [
      path.join(__dirname, 'src', 'index.jsx')
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'standard-loader'
      }, 
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  }
}
