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

  entry: base.entry,

  output: Object.assign({}, base.output, {
    path: base.paths.dist,
    filename: '[name].bundle.[chunkhash].js',
    publicPath: ''
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
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: base.vendorsSplitTest(),
          chunks: 'initial',
          name: 'vendors'
        },
        react: {
          test: base.reactSplitTest(),
          chunks: 'all',
          name: 'react'
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
      Object.assign({}, base.fileLoader, {
        use: Object.assign({}, base.fileLoader.use[0], {
          options: Object.assign({}, base.fileLoader.use[0].options, {
            publicPath: ''
          })
        })
      }),
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
    alias: Object.assign({}, base.resolve.alias, {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    })
  })
}
