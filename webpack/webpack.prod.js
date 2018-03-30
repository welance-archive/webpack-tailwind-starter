const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const imagesPath = path.resolve(__dirname, '../__src/images');
const rootPath = path.resolve(__dirname);

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
		//about SASS compilation
		new ExtractTextPlugin({
			filename: "styles/main.min.css"
		}),
		new ImageminWebpackPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			//disable: process.env.NODE_ENV !== 'prod',
			pngquant: {
				quality: '95-100'
			},
			optipng: {
				optimizationLevel: 5 //0-7 (7 slower)
			},
			jpegtran: {
				progressive: true
			},
			gifsicle: {
				optimizationLevel: 3 //1-3 (3 slower)
			}
		}),
		new FaviconsWebpackPlugin({
			// Your source logo
			logo: imagesPath + '/favicon.svg',
			// The prefix for all image files (might be a folder or a name)
			prefix: 'images/icons-[hash]/',
			// Emit all stats of the generated icons
			emitStats: false,
			// The name of the json containing all favicon information
			statsFilename: 'iconstats-[hash].json',
			// Generate a cache file with control hashes and
			// don't rebuild the favicons until those hashes change
			persistentCache: true,
			// Inject the html into the html-webpack-plugin
			inject: true,
			// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			//background: '#fff',
			// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
			title: 'Peacelab.blog',

			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
    })
  ]
})
