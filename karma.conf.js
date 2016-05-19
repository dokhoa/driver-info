var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");
var precss = require("precss");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = path.resolve(__dirname, "src");
var packageJson = require("./package.json");

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: [ "mocha" ],
    files: [
      "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.js",
      "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js",
      "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.5.1/lodash.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js",
      "https://devdepot.eroad.com/Portal/javascript/metrics.js",
      "src/**/__tests__/**/*-test.js"
    ],
    preprocessors: {
      "src/**/*.js": ["webpack", "sourcemap"]
    },
    webpack: {
      devtool: "inline-source-map",
      module: {
        loaders: [
          {
            test: /\.jsx?/,
            loader: "babel",
            exclude: path.resolve(__dirname, "node_modules")
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
        metrics: "metrics",
        lodash: "_",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": "window"
      },
      plugins: [
        new ExtractTextPlugin("styles.css", { allChunks: true })
      ]
    },
    webpackServer: {
      noInfo: true
    },
    plugins: [
      "karma-webpack",
      "karma-mocha",
      "karma-sourcemap-loader",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher",
      "karma-firefox-launcher",
      "karma-ie-launcher"
    ],
    reporters: [ "progress" ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["PhantomJS", "Chrome", "Firefox"],
    singleRun: true,
    concurrency: Infinity
  });
};
