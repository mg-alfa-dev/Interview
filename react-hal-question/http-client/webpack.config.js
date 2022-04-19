const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      type: 'commonjs2'
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'types/http-client', to: '.' },
      ],
    }),
  ],
};