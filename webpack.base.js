const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [path.join(__dirname, 'src', 'index.js')]
  },

  output: {
    path: path.join(__dirname),
    filename: '[name].bundle.[hash].js',
    publicPath: ''
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'WEBPACK REACT BOILERPLATE',
      template: path.join(__dirname, 'src', 'html', 'template.html')
    })
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'standard-loader'
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}
