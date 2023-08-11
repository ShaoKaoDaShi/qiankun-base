import nprogress from "nprogress";
import "nprogress/nprogress.css";
import React,{ useEffect } from "react";
const NProgress = nprogress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});


// const NProgressComponent: React.FC = () => {
//   useEffect(() => {
//     NProgress.start();
//     return () => {
//       NProgress.done();
//     };
//   });
//   return <span></span>;
// };
// export {
//   NProgressComponent
// }
export default NProgress;