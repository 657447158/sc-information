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
  }
}