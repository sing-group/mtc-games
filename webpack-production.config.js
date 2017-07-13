const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: {
    main: [
      // only- means to only hot reload for successful updates
      './src/index.jsx'
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'app.js'
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpe?g|gif|png)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};

module.exports = config;
