const webpack = require("webpack");
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let BASE_URL  = '/';                          //HTML5 history api href for <base>
let API_URL   = 'http://localhost/';     //API endpoints base

const source_path = path.resolve(__dirname, '..', 'src');
const public_path = path.resolve(__dirname, '../dist');

const main_js_path = source_path + '/scripts/main.js';
const main_css_path = source_path + '/styles/main.css';
const images_path = source_path + '/images';
const fonts_path = source_path + '/fonts';

// const js_split_options = {
//                           minSize: 30000, //Byte, split point. Default: 30720
//                           maxSize: 50000, //Byte, maxsize of per file. Default: 51200
//                           chunkOverhead: 0, //Default: 0
//                           entryChunkMultiplicator: 1, //Default: 1
//                         };

switch(process.env.NODE_ENV){
  case 'dev':
    BASE_URL = '/';
    API_URL  = 'http://localhost/';
    break;
  case 'prod':
    BASE_URL = '/';
    API_URL = 'http://localhost/';
    break;
  default:
    //nothing here;
    break;
}

module.exports = {
  entry: {
    main: [
      main_js_path,
      main_css_path
    ],
    // vendor: ["zepto", "object-fit-images"]
  },
  output: {
    filename: process.env.NODE_ENV === 'prod' ? 'scripts/[name].min.js?h=[hash]' : 'scripts/[name].js?h=[hash]',
    path: public_path,
    publicPath: '/'
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         // name: 'vendor',
  //         chunks: 'all',
  //         minSize: 1,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  plugins: [
    // new webpack.optimize.AggressiveSplittingPlugin(js_split_options),
    new HtmlWebpackPlugin({
      template: source_path + '/index.html',
      filename: 'index.html',
      inject: true,
      title: 'Webpack + TailwingCSS starter',
      baseUrl: '/',
      APIUrl: 'http://localhost:8080/',
      alwaysWriteToDisk: true
    }),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   // filename: "[name].css",
    //   // chunkFilename: "[id].css"
    //   filename: "[name].[chunkhash].css"
    // }),
    new ExtractTextPlugin({
			filename: "styles/main.css"
		}),
    new CleanWebpackPlugin([public_path], {allowExternal: true}),
    new webpack.DefinePlugin({
      "BASE_URL": JSON.stringify(BASE_URL),
      "API_URL": JSON.stringify(API_URL)
    }),
    // pass jquery and object-fit-images to all JS files
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   objectFitImages: "object-fit-images"
    // }),
    // Simply copy assets to dist folder
    new CopyWebpackPlugin([
      { from: images_path, to: 'images' },
      { from: fonts_path, to: 'fonts' }
    ])
  ],
  module: {
		rules: [
			//ES6 to ES5 compilation is done by Webpack v4!
      // CSS (tailwind) compilation
			{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: path.resolve(__dirname, '../postcss.config.js')
                }
              }
            }
          ],
          // publicPath: "/public"
        })
      }
		]
	}
};
