const path = require("path");

module.exports = {
  entry: {
    index: "./index.js",
    store: "./store.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "release"),
    libraryTarget: "amd",
    library: "reactApp"
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory"],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/app1/"
            }
          }
        ]
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
