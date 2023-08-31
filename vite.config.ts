import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import terser from "@rollup/plugin-terser";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
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
            "/ding": {
                target: process.env.DING_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/ding/, ""),
            },
        },
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ["lodash"],
                    rrweb: ["rrweb"],
                },
            },
            // plugins: [
            //     terser({
            //         compress: {
            //             drop_debugger: true,
            //             drop_console: true,
            //         },
            //     }),
            // ],
        },
    },
});
