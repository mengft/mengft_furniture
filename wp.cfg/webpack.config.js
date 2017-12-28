var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: { // babel的配置参数，可以写在.babelrc文件里也可以写在这里
        presets: ['react']
      }
    }, {
      test: /\.css$/,
      loader: 'css-loader'
    }, {
      test: /\.less$/,
      loader: 'less-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=25000'
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
