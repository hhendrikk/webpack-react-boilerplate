"use strict"

const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const config = require("./webpack.config")

new WebpackDevServer(webpack(config), {

  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {
    colors: true,
    stats: 'verbose'
  },
  hot: true

}).listen(3000, (err) => {

  if(err) {
    return console.log(err)
  }

  console.log("Listening on http://localhost:3000")
})
