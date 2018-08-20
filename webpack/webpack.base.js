const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist')
}

module.exports = {
  paths,

  entry: {
    app: [join(paths.src, 'index.js')]
  },

  output: {
    path: paths.root,
    filename: '[name].bundle.[hash].js',
    publicPath: ''
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'WEBPACK REACT BOILERPLATE',
      template: join(paths.src, 'html', 'template.html')
    })
  ],

  standardPreLoader: {
    enforce: 'pre',
    test: /\.js$/,
    include: paths.src,
    exclude: /node_modules/,
    use: {
      loader: 'standard-loader',
      options: {
        parser: 'babel-eslint'
      }
    }
  },

  jsLoader: {
    test: /\.js$/,
    include: paths.src,
    exclude: /node_modules/,
    use: 'babel-loader'
  },

  cssLoader: {
    test: /\.s?[ac]ss$/,
    include: paths.src,
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
      src: paths.src,
      components: join(paths.src, 'components'),
      sass: join(paths.src, 'sass')
    }
  }
}
