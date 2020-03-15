const msg = require('./src/languages')
console.log(JSON.stringify(msg))
const title = msg[process.env.NODE_ENV].webTit

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/global.scss";`
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  pages: {
    'index': {
      title,
      entry: 'src/pages/index/main.js'
    },
    'list': {
      title,
      entry: 'src/pages/list/main.js'
    },
    'destination': {
      title,
      entry: 'src/pages/destination/main.js'
    },
    'article-detail': {
      title,
      entry: 'src/pages/article-detail/main.js'
    },
    'channel-detail': {
      title,
      entry: 'src/pages/channel-detail/main.js'
    },
    'service': {
      title,
      entry: 'src/pages/service/main.js'
    },
    'recommend':{
      title,
      entry: 'src/pages/recommend/main.js'
    },
    'list-menu':{
      title,
      entry: 'src/pages/list-menu/main.js'
    },
    'scenic-detail':{
      title,
      entry: 'src/pages/scenic-detail/main.js'
    },
    'search':{
      title,
      entry: 'src/pages/search/main.js'
    }
  }
}