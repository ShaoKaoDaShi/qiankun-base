import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { BundleStatsWebpackPlugin } from 'bundle-stats-webpack-plugin';

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'assets',
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
    new BundleStatsWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js','.ts','.jsx','.tsx'],
  },

};

// export default config;

export default (env, argv) => {

  if (argv.mode === "development") {
    config.devtool="source-map";
    config.devServer = {
      historyApiFallback: true,
      // compress: true,
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      client: {
        // logging: "info",
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      proxy: {
        "/api": {
          target: "http://localhost:3001", // 代理地址
          pathRewrite: {
            "^/api": "",
          },
          // 默认代理服务器，会以我们实际在浏览器请求的主机名【localhost:8080】，作为代理服务器的主机名，
          // 然后代理服务器会带上这个主机名，去请求github，然而 github是不认识 【localhost:8080】
          //  changeOrigin: true 就是以实际代理请求发生过程中的主机名去请求，如：代理服务器的主机名
          changeOrigin: true,
        },
      },
    };
  }
  if (argv.mode === "production") {
    config.mode = "production";
    config.optimization = {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    }
  }

  return config;
};
