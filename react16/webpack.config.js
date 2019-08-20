const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    store: "./src/store.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "react",
    jsonpFunction: `webpackJsonp_react`
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory"],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      }
    ]
  },

  mode: "development",

  devtool: "eval-source-map",
  devServer: {
    contentBase: __dirname + "/dist",
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
