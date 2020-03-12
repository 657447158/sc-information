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
    'index': 'src/pages/index/main.js',
    'list': 'src/pages/list/main.js',
    'destination': 'src/pages/destination/main.js',
    'article-detail':'src/pages/article-detail/main.js',
    'service':'src/pages/service/main.js',
    // service
  }
}