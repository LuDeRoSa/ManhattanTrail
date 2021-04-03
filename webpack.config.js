module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  /*
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
       // loader: 'babel-loader',
    /*    options: {
          presets: [
            '@babel/preset-react',
            { plugins: ['@babel/plugin-proposal-class-properties'] },
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
*/
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
         loader: 'babel-loader',
      options: {
      presets: [
        '@babel/preset-react',
        { plugins: ['@babel/plugin-proposal-class-properties'] },
      ],
    },
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }
]
}
};