const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    library: 'vuex-orm-axios',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
