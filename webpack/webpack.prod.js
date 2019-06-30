
const base = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',

  entry: base.entry,

  output: Object.assign({}, base.output, {
    path: base.paths.dist,
    filename: '[name].bundle.[chunkhash].js',
    publicPath: base.output.publicPath
  }),

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: 2,
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
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
          priority: 20
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin(Object.assign({}, base.htmlPlugin, {
      minify: { collapseWhitespace: true }
    })),

    new CleanWebpackPlugin({
      verbose: true
    }),

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
  resolve: Object.assign({}, base.resolve, {
    alias: Object.assign({}, base.resolve.alias, (() => (
      process.env.BUILD_LIB_ENV === 'preact' ? {
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
      } : {
        'react-dom': 'react-dom'
      }
    ))())
  })
}
