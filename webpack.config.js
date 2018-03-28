const path = require("path");

const config = {
  context: __dirname,
  entry: "./snake/js/main.js",
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "source-map"
};

module.exports = config;
