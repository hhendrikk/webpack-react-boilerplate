const base = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',

  entry: base.entry.main,

  output: Object.assign({}, base.output, {
    path: base.paths.dist,
    filename: '[name].bundle.[chunkhash].js'
  }),

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: ({ resource }) => {
            if (/node_modules(\\|\/)+react(-dom)?/.test(resource)) {
              return false
            }

            return /node_modules/.test(resource)
          },
          name: 'vendors',
          chunks: 'all'
        },
        react: {
          test: ({ resource }) => (
            /node_modules(\\|\/)+react(-dom)?/.test(resource)
          ),
          name: 'react-build',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin(Object.assign({}, base.htmlPlugin, {
      minify: { collapseWhitespace: true }
    })),

    new CleanWebpackPlugin(
      ['dist'],
      {
        root: base.paths.root,
        verbose: true
      }
    ),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    })
  ].concat(
    process.env.ANALIZER ? new BundleAnalyzerPlugin() : []
  ),

  module: {
    rules: [
      base.standardPreLoader,
      base.jsLoader,
      base.fileLoader,
      base.urlLoader,
      Object.assign({}, base.cssLoader, {
        use: [
          MiniCssExtractPlugin.loader,
          ...base.cssLoader.use.slice(1)
        ]
      })
    ]
  },

  resolve: base.resolve
}
