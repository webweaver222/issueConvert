const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env = {}) => {
  const { mode = "development" } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: "issueConv",
        template: "public/index.html",
      }),
    ];

    if (isProd)
      plugins.push(new MiniCssExtractPlugin({ filename: "main-[hash:8].css" }));

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "main-[hash:8].js" : undefined,
      publicPath: "",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },

    module: {
      rules: [
        { test: /\.tsx?$/, loader: "babel-loader", exclude: /node_modules/ },
        { test: /\.css$/, use: getStyleLoaders() },
        { test: /\.s[ca]ss$/, use: [...getStyleLoaders(), "sass-loader"] },
      ],
    },

    plugins: getPlugins(),

    optimization: isProd
      ? {
          minimizer: [new TerserWebpackPlugin()],
        }
      : {},

    devServer: {
      //host: '0.0.0.0',
      //disableHostCheck: true,
      open: true,
      port: 8000,
      historyApiFallback: true,
      contentBase: "./",
      hot: true,
      openPage: "",
    },
  };
};
