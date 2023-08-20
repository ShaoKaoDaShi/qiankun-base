import axios from "axios";
import nprogress from "../components/NProgress";
import Cookies from "js-cookie";
const instance = axios.create();
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        nprogress.start();
        config.headers.Authorization = Cookies.get("access_token");
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        nprogress.done();
        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

// instance.get("/api/users?id=32");
// instance.post("/api/users",{id:32});
export default instance;
