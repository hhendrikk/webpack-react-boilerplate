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
    use: 'babel-loader'
  },

  cssLoader: {
    test: /\.s?[ac]ss$/,
    include: paths.src,
    use: [
      'style-loader',
      'css-loader?modules',
      'sass-loader'
    ]
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name][sha256:hash:base64:8].[ext]',
          outputPath: 'media',
          path: 'media'
        }
      }
    ]
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
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
