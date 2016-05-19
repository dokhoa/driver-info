var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");
var precss = require("precss");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = path.resolve(__dirname, "src");
var packageJson = require("./package.json");

var config = {
  entry: APP_DIR + "/index.jsx",
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: "babel"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=" + packageJson.name + "__[name]__[local]___[hash:base64:5]!postcss-loader")
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },

  postcss: function() {
    return [autoprefixer, precss];
  },

  resolve: {
    modulesDirectories: ["node_modules", "components"]
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    moment: "moment",
    lodash: "_",
    metrics: "metrics",
  },

  plugins: [
    new ExtractTextPlugin("styles.css", { allChunks: true })
  ]
};

module.exports = config;
