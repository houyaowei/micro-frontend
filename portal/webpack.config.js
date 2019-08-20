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
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
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
      "/15react15": {
        target: "http://localhost:7102",
        pathRewrite: function(url) {
          return url.replace(/\/15react15/, "");
        }
      },
      "/react": {
        target: "http://localhost:7100",
        pathRewrite: { "^/react": "" }
      },
      "/vue": {
        target: "http://localhost:7101",
        pathRewrite: { "^/vue": "" }
      }
    }
  }
};
