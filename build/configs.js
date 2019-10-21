const path = require('path')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  umdDev: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-axios.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-axios.min.js'),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-axios.common.js'),
    format: 'cjs'
  },
  esm: {
    input: resolve('lib/index.js'),
    file: resolve('dist/vuex-orm-axios.esm.js'),
    format: 'es'
  }
}

function genConfig (opts) {
  return {
    input: {
      input: opts.input,

      plugins: [
        nodeResolve(),
        commonjs()
      ],

      onwarn (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') {
          return
        }

        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        }

        console.error(warning.message)
      }
    },

    output: {
      name: 'VuexORMAxios',
      file: opts.file,
      format: opts.format
    }
  }
}

function mapValues (obj, fn) {
  const res = {}

  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })

  return res
}

module.exports = mapValues(configs, genConfig)
