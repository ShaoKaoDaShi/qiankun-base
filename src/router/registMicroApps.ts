import myTimer from "../store/timer";
import { registerMicroApps } from "qiankun";
const apps = [
  {
    name: "vue-web-app",
    entry: "//localhost:8082",
    container: "#container",
    activeRule: "/vue",
    props: { timer: myTimer },
  },
  {
    name: "react-web-app",
    entry: "//localhost:8081",
    container: "#container",
    activeRule: "/react",
    props: { timer: myTimer },
  },
];
registerMicroApps(apps);