// function myPromiseAll(promiseArr) {
//     // code here
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         for (let i = 0; i < promiseArr.length; i++) {
//             promiseArr[i]
//                 .then((res) => {
//                     result[i] = res;
//                     count++;
//                     if (count === promiseArr.length) {
//                         resolve(result);
//                     }
//                 })
//                 .catch((res) => {
//                     reject(res);
//                 });
//         }
//     });
// }

// // 调用参考
// const promise1 = new Promise((resolve) => resolve(1));
// const promise2 = new Promise((resolve) => resolve(2));
// const promise3 = new Promise((resolve) => resolve(3));
// const promiseAll = myPromiseAll([promise1, promise2, promise3]);
// promiseAll.then(function (res) {
//     console.log(res); // 输出：[1,2,3]
// });

// class EventBus {
//     // on 用于注册事件
//     // emit 用于触发事件
//     taskStack = new Map();
//     on(eventName, cb) {
//         // code here
//         const taskMap = this.taskStack.get(eventName);
//         if (taskMap) {
//             taskMap.set(cb, cb);
//         } else {
//             const taskMap = new Map();
//             taskMap.set(cb, cb);
//             this.taskStack.set(eventName, taskMap);
//         }
//     }
//     emit(eventName, arg) {
//         // code here
//         const taskMap = this.taskStack.get(eventName);
//         taskMap.forEach((value, key) => {
//             value(arg);
//         });
//     }
// }

// // 调用参考
// const bus = new EventBus();
// bus.on("event01", (eventArg) => console.log("event01", eventArg));
// bus.emit("event01", 123); //输出：event01 123

// // 版本号格式参考如：1.0.0
// function compareVersion(source, target) {
//     // code here
//     const arr = [0, 2, 4];
//     for (let i = 0; i < arr.length; i++) {
//         const index = arr[i];
//         const s = source.charAt(index);
//         const t = target.charAt(index);
//         if (s > t) {
//             return 1;
//         } else if (s < t) {
//             return -1;
//         }
//     }
//     return 0;
// }

// // 调用参考
// console.log(compareVersion("1.0.3", "1.0.5")); // 返回 -1
// console.log(compareVersion("1.0.7", "1.0.5"));
// console.log(compareVersion("1.1.3", "1.0.5")); // 返回 1
// // 返回 1

// // 节流：函数每一段时间内只会执行一次
// function throttle(fn, wait) {
//     // code here
//     let id;
//     return (...args) => {
//         if (id) return;
//         fn(...args);
//         id = setTimeout(() => {
//             clearTimeout(id);
//         }, wait);
//     };
// }

// // 调用参考
// const throttleFn = throttle((arg) => {
//     console.log(arg);
// }, 1000);
// throttleFn(1); // 1
// throttleFn(1);

function urlToObj(url) {
    // code here
    const [, path, queryString] = url.match(/^(.*?)\?(.*)/);
    const query = {};
    queryString.split("&").forEach((item) => {
        const [key, value] = item.split("=");
        query[key] = value;
    });
    return { path, query };
}

function objToUrl(obj) {
    // code here
    const path = obj.path;
    let queryString = "";
    for (const [key, value] of Object.entries(obj.query)) {
        queryString += "&" + key + "=" + value;
    }
    return queryString ? path + "?" + queryString.slice(1) : path;
}

// 调用参考
// const url = "https://www.douyin.com/abc?foo=1&bar=2";
// const urlObj = urlToObj(url);
// console.log(urlObj);
// // 输出
// // {
// //     path: 'https://www.douyin.com/abc',
// //     query: {
// //         foo: '1',
// //         bar: '2'
// //     }
// // }
// urlObj.query.coo = "3";
// const newUrl = objToUrl(urlObj);
// console.log(newUrl);
// 输出 https://www.douyin.com/abc?foo=1&bar=2&coo=3
