import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
dotenv.config();

// https://vitejs.dev/config/
const config = {
    define: {
        "process.env.not_qiankun": process.env.BASE_ENV,
    },
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3001",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },

    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ["lodash"],
                    rrweb: ["rrweb"],
                },
            },
            plugins: [
                terser({
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                    format: {
                        comments: false,
                    },
                }),
            ],
        },
    },
};

if (process.env.SOURCE_MAP) {
    config.build.sourcemap = true;
    config.build.rollupOptions.plugins.push(
        copy({
            targets: [
                {
                    src: "dist/assets/*.map",
                    dest: "dist/sourcemaps",
                },
            ],
            hook: "writeBundle",
        }),
    );
}
export default defineConfig(config);
