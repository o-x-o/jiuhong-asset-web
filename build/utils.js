'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders=[]) {
    
    loaders = loaders.map(function(loader,i) {
      return {
        loader: (loader.name||loader) + '-loader',
        options: Object.assign({}, loader.options, {
          sourceMap: options.sourceMap
        })
      }
    }, this);
    loaders.unshift({
      loader: 'css-loader',
      options: {
        minimize: process.env.NODE_ENV === 'production',
        sourceMap: options.sourceMap
      }
    });

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders(['less']),
    sass: generateLoaders([{ name:'sass', options:{ indentedSyntax: true } }]),
    scss: generateLoaders(['sass', { name:'sass-resources', options:{ resources: [path.resolve(__dirname, config.paths.assets, 'css/var.scss')] } }] ),
    stylus: generateLoaders(['stylus']),
    styl: generateLoaders(['stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
