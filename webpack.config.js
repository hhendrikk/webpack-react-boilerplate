const path = require('path'),
  webpack = require('webpack')

module.exports = {
  devtool: "source-map",
  mode: "development",

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, "src", "index.jsx")
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },

  module: {
    rules: [{
      enforce: "pre",
      test: /\.jsx$/,
      include: path.resolve(__dirname, "src"),
      exclude: /node_modules/,
      loader: "standard-loader"
    },
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          plugins: ["react-hot-loader/babel"]
        },
      }]
  },
  
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
