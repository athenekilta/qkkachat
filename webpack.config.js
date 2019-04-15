const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?http://localhost:3030/",
    "./app/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: [
          { loader: "react-hot-loader/webpack" },
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react", "stage-2"],
              plugins: ["react-hot-loader/babel"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: "file-loader?name=images/[name].[ext]"
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "app")],
    extensions: [".js", ".jsx"]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
