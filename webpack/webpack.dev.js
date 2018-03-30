const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackHarddiskPlugin= require('html-webpack-harddisk-plugin');

module.exports = merge(common, {
  // devtool: 'inline-source-map',
  performance: {
    // hints: "error" // don't show performance hints
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    // compress: true,
    // historyApiFallback: true,
    // hot: true,
    port: 9000
  },
  plugins: [
		//about SASS compilation
		new ExtractTextPlugin({
			filename: "styles/main.css"
    }),
    // new HtmlWebpackHarddiskPlugin()
  ]
});


