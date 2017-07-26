const webpack = require('webpack');
const path = require('path');

module.exports = {
  // Entry points to the project
  entry: {
    main: [
      // only- means to only hot reload for successful updates
      './lib/index.js'
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
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
  },
};
