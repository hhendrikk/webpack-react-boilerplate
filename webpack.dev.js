const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')
const WebpackDevServer = require('webpack-dev-server')

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
    new webpack.NoEmitOnErrorsPlugin()
  ]
}, base)

new WebpackDevServer(webpack(devConfig), devConfig.devServer)
  .listen(3000, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log('Listening on http://localhost:3000')
  })
