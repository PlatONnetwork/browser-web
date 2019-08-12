'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env =
  process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    // rules: utils.styleLoaders({
    //   sourceMap: config.build.productionSourceMap,
    //   extract: true
    // })
    rules: [

      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: "postcss-loader",
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: "postcss-loader",
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }, "less-loader"]
      }

    ]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    splitChunks: {
      chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      // name:'commons',
      cacheGroups: {  //这层没设置的属性取上层对象的属性，这层设置了的属性会覆盖上层的属性
        vendors: {
          test: /[\\/]node_modules[\\/]/,   //用于控制哪些模块被这个缓存组匹配到、它默认会选择所有的模块
          priority: -10,   //缓存组打包的先后优先级
          name: 'vendor',
          minSize: 0
        },
        utilCommon: {   // 抽离自定义工具库
          name: "common",
          minSize: 0,     // 将引用模块分离成新代码文件的最小体积
          minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20
        },
      }
    },
    // chunk for the webpack runtime code and chunk manifest
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new UglifyJsPlugin({
      parallel: true,
      cache: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: true,
          /* eslint-disable */
          drop_debugger: true,
          drop_console: true
        },
        mangle: true
      }
    }),
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[hash].css'),
    //   allChunks: true
    // }),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      favicon: path.resolve('./static/images/favicon.ico'), // 引入图片地址
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
