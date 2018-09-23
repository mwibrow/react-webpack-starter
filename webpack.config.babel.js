import path from 'path'

import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlReplaceWebpackPlugin from 'html-replace-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpack from 'webpack'

import pkg from './package.json'

const distDirName = 'dist'
const dirnameIsDistDir = path.resolve(__dirname).endsWith(distDirName)
const rootDir = dirnameIsDistDir
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname)

const PKG_VERSION = `v${pkg.version}`

const srcDir = path.resolve(rootDir, 'app')
const buildDir = path.resolve(rootDir, 'dist')
const publicDir = path.resolve(buildDir, 'public')

const production = process.env.NODE_ENV === 'production'
const mode = production ? 'production' : 'development'

const config = {
  mode: mode,
  entry: {
    app: [
      path.resolve(srcDir, 'index.js'),
      path.resolve(srcDir, 'styles', 'main.scss')
    ]
  },
  output: {
    publicPath: '/',
    path: publicDir,
    filename: path.join(PKG_VERSION, 'js', 'bundle.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
                'stage-0',
                'react',
                'react-hmre'
              ]
            }
          }
        ]
      },
      // Generate CSS to be bundled with webapp
      {
        test: /\.scss$/,
        include: [
          path.resolve(rootDir, 'node_modules'),
          path.resolve(srcDir, 'styles')
        ],
        use: ['style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcDir, 'index.html')
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@version',
        replacement: PKG_VERSION
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(rootDir, 'assets', 'images'),
        to: path.resolve(publicDir, PKG_VERSION, 'images')
      }
    ])
  ],
  performance: {
    hints: false
  },
  devServer: {
    contentBase: path.resolve(publicDir),
    port: 3000
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000
  }
}

export default config
