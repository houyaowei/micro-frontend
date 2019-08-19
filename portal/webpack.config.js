const path = require("path");
const webpack = require("webpack");
const HTMLWebpachPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    publicPath: "",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
    // libraryTarget: "system"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HTMLWebpachPlugin({
      title: "micro-frontend",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/libs",
        to: "lib"
      }
    ])
    // new CleanWebpackPlugin(["dist"])
  ],
  node: {
    fs: "empty"
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  devtool: "cheap-module-eval-source-map",
  externals: [],
  mode: "development",
  devServer: {
    contentBase: __dirname + "/dist",
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/react15App": {
        target: "http://localhost:7102",
        pathRewrite: function(url) {
          return url.replace(/\/react15App/, "");
        }
      },
      "/react16App": {
        target: "http://localhost:7100",
        pathRewrite: { "^/react16App": "" }
      },
      "/vueApp": {
        target: "http://localhost:7101",
        pathRewrite: { "^/vueApp": "" }
      }
    }
  }
};
