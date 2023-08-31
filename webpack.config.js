import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// // in case you run into any typescript error when configuring `devServer`
import CopyWebpackPlugin from "copy-webpack-plugin";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import { BundleStatsWebpackPlugin } from "bundle-stats-webpack-plugin";
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development",
    entry: "./src/index.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        clean: true,
        publicPath: "/", // 相对于服务(server-relative)
    },
    module: {
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: "ts-loader",
            //         },
            //     ],
            // },

            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "swc-loader",
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: true,
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", { loader: "css-loader" }],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [{ loader: "@svgr/webpack", options: { icon: true } }],
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),

        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template:
                process.env.MODE === "multiple"
                    ? "./multiple.html"
                    : "./public/index.ejs",
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            // },
            templateParameters: {
                PUBLIC_URL: "/",
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    to: "./",
                    globOptions: {
                        ignore: ["**/*.html"],
                    },
                },
            ],
        }),
        // new BundleStatsWebpackPlugin(),
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
    },
};

// export default config;

module.exports = (env, argv) => {
    config.plugins.push(
        new webpack.DefinePlugin({
            haha: true,
            "process.env.not_qiankun": process.env.BASE_ENV,
        }),
    );
    if (argv.mode === "development") {
        config.devtool = "eval-source-map";
        config.devServer = {
            historyApiFallback: true,
            compress: true,
            // static: {
            //     directory: path.join(__dirname, "public"),
            // },
            port: 3000,
            hot: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            client: {
                // logging: "info",
                // overlay: {
                //     errors: true,
                //     warnings: false,
                // },
                overlay: false,
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
                    // changeOrigin: true,
                },
            },
        };
    }
    if (argv.mode === "production") {
        config.mode = "production";
        config.devtool = "source-map";
        config.optimization = {
            moduleIds: "deterministic",
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        };
    }

    return config;
};
