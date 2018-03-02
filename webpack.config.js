const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

const devServer = {
  colors: true,
  quiet: false,
  noInfo: false,
  port: 8080,
  hot: true,
  stats: 'minimal',
  historyApiFallback: true,
  disableHostCheck: true,
}

module.exports = {
  devtool: 'inline-source-map',
  debug: env !== 'prod',
  devServer,
  entry: (function () {
    if (env === 'prod') {
      return {
        app: './src/index',
        vendor: ['react', 'react-dom', 'react-redux', 'redux', 'redux-create-reducer', 'redux-immutable', 'redux-thunk', 'immutable', 'reselect', 'classnames'],
      }
    }
    return {
      app: [
        `webpack-dev-server/client?http://0.0.0.0:${devServer.port}`,
        'webpack/hot/dev-server',
        './src/index',
      ],
    }
  }()),
  output: (function () {
    if (env === 'prod') {
      return {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js?[hash]',
        publicPath: './',
      }
    }
    return {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/',
    }
  }()),
  plugins: (function () {
    if (env === 'prod') {
      return [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new HtmlWebpackPlugin({
          title: 'todos-redux-immutable',
          template: path.resolve(__dirname, './index.html'),
          filename: 'index.html',
          minify: {    // 压缩HTML文件
            removeComments: true,    // 移除HTML中的注释
            collapseWhitespace: true,    // 删除空白符与换行符
          },
        }),
      ]
    }
    return [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.OldWatchingPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin(),
      // new ExtractTextPlugin({filename: '[name].css', allChunks: true }),
      new ExtractTextPlugin('style.css', { allChunks: true }),
      new HtmlWebpackPlugin({ title: 'todos-redux-immutable', template: './index.html' }),
    ]
  }()),
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'react-hot-loader',
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      }, {
        test: /\.less$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!less-loader'),
      }, {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer'),
      },
    ],
  },
  postcss: [postcssCssnext({ browsers: [
    'iOS >= 8',
    'Android >= 4',
  ] })],
}
