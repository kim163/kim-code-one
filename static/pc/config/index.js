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
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9999,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "**/*.php":{
        target:"https://dc-jiuan.com",
        changeOrigin:true
      }
    },
    useEslint: false,
    showEslintErrorsInOverlay: false,
    cssSourceMap: false,
    autoOpenBrowser:true
  }
}
