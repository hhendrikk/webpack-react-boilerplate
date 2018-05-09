const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devConfig = merge({
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server'
    ]
  },

  devServer: {
    publicPath: base.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      stats: 'verbose'
    },
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ],

  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
      loader: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  }
}, base)

new WebpackDevServer(webpack(devConfig), devConfig.devServer)
  .listen(3000, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log('Listening on http://localhost:3000')
  })
