var path = require('path')
var utils = require('./utils')
var config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const _ = require('lodash')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  entry: {
    app: ["babel-polyfill", "./src/main.js"],
  },
  externals:{
    touclick:"TouClick"
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$':'vue/dist/vue.esm.js',
      '@':resolve('src'),
      "base":resolve('src/base'),
      "api":resolve('src/api'),
      'static':resolve('static'),
      'views':resolve('src/views'),
      'components':resolve('src/components'),
      'images':resolve('src/assets/images'),
      'assets':resolve('src/assets')
    }
  },
  module: {
    rules: [
/*      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',  //缓存loader执行结果
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'),resolve('node_modules/vue-plugin-load-script')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader'
        }
      },
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      _: 'lodash',
      Velocity: 'velocity-animate',
      mapGetters: ['vuex', 'mapGetters'],
    })
  ],
  /*隐藏warning*/
  performance:{
    hints:false
  },
}
