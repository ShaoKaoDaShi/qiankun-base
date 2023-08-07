import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool:"source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "foo.bundle.js",
    publicPath: "/",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  resolve: {
    extensions: ['.js',',cjs','.tty',',mjs','.ts','.jsx','.tsx', '.json', '.wasm','.jpg','.png','.svg',],
  },
  // devServer: {
  //   compress: true,
  //   // static: {
  //   //   directory: path.join(__dirname, "public"),
  //   // },
  //   port: 3000,
  //   hot: true,
  //   open: true,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   client: {
  //     logging: "info",
  //     overlay: {
  //       errors: true,
  //       warnings: false,
  //     },
  //   },
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3001", // 代理地址
  //       pathRewrite: {
  //         "^/api": "",
  //       },
  //       // 默认代理服务器，会以我们实际在浏览器请求的主机名【localhost:8080】，作为代理服务器的主机名，
  //       // 然后代理服务器会带上这个主机名，去请求github，然而 github是不认识 【localhost:8080】
  //       //  changeOrigin: true 就是以实际代理请求发生过程中的主机名去请求，如：代理服务器的主机名
  //       changeOrigin: true,
  //     },
  //   },
  // },
};

// export default config;

export default (env, argv) => {
  config.devServer = {
    compress: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    hot: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      logging: "info",
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
  if (argv.mode === "development") {
    config.devServer = {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      headers: {
        "Access-Control-Allow-Origin": "*",
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
  }

  return config;
};
