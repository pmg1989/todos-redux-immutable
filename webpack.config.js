const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

const devServer = {
  contentBase: __dirname + '/src',
  colors: true,
  quiet: false,
  noInfo: false,
  publicPath: '/static/',
  port: 8000,
  hot: true,
  stats: 'minimal',
  historyApiFallback: true
};

module.exports = {
  devtool: '#eval', //'inline-source-map',
  debug: true,
  devServer,
  context: path.resolve(__dirname, 'src'),
  postcss: [ postcssCssnext({ browsers: ['last 2 versions'] }) ],
  entry: function() {
    if(env === 'prod') {
      return {
        app: './index',
        vendor: [ 'react', 'react-dom', 'react-redux', 'redux', 'reselect']
      }
    }
    return {
      app: [
        'webpack-dev-server/client?http://127.0.0.1:' + devServer.port,
        'webpack/hot/dev-server',
        './'
      ]
    }
  }(),
  output: function(){
    if(env === 'prod') {
      return {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js?[hash]',
        publicPath: './'
      }
    }
    return {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].js',
      publicPath: devServer.publicPath
    }
  }(),
  plugins: function(){
    if(env === 'prod') {
      return [
        new ExtractTextPlugin({filename: '[name].bundle.css?[hash]', allChunks: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
        new HtmlWebpackPlugin({
          title: 'todos-redux-immutable',
          template: path.resolve(__dirname, 'src/index.html'),
          filename: `index.html`,
          minify:{    //压缩HTML文件
           removeComments:true,    //移除HTML中的注释
           collapseWhitespace:true    //删除空白符与换行符
          }
        })
      ]
    }
    return [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.OldWatchingPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    ]
  }(),
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'react-hot-loader'
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }, {
        test: /\.css/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
