const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [join(__dirname, '..', 'src', 'index.js')]
  },

  output: {
    path: join(__dirname, '..'),
    filename: '[name].bundle.[hash].js',
    publicPath: ''
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'WEBPACK REACT BOILERPLATE',
      template: join(__dirname, '..', 'src', 'html', 'template.html')
    })
  ],

  standardPreLoader: {
    enforce: 'pre',
    test: /\.js$/,
    include: join(__dirname, '..', 'src'),
    exclude: /node_modules/,
    use: 'standard-loader'
  },

  jsLoader: {
    test: /\.js$/,
    include: join(__dirname, '..', 'src'),
    exclude: /node_modules/,
    use: 'babel-loader'
  },

  cssLoader: {
    test: /\.s?[ac]ss$/,
    include: join(__dirname, '..', 'src'),
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader?modules',
      'sass-loader'
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: join(__dirname, '..', 'src'),
      components: join(__dirname, '..', 'src', 'components'),
      sass: join(__dirname, '..', 'src', 'sass')
    }
  }
}
