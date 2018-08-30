var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9999,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api":{
       // target:"http://150.109.33.205:9001",
        target:'http://47.52.202.233',
       // target:'http://10.33.67.31:17000',
        changeOrigin:true
      }
    },
    useEslint: false,
    showEslintErrorsInOverlay: false,
    cssSourceMap: false,
    autoOpenBrowser:true
  }
}
