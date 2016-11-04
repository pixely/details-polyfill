module.exports = {
  entry: './src/details-polyfill.js',
  output: {
    path: __dirname,
    filename: '/dist/details-polyfill.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  devtool: 'source-map',
};
