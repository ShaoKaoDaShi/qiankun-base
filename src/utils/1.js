// function myFlat(arr) {
//     const newArr = [];

//     arr.forEach((item) => {
//         Array.isArray(item) ? newArr.push(...myFlat(item)) : newArr.push(item);
//     });
//     return newArr;
// }
// const arr = [1, [2, [3, 4], 5], [6, 7], [8]];

// console.log(myFlat(arr));

// function myFlat(arr) {
//     const newArr = [];
//     const queue = [...arr];
//     while (queue.length) {
//         const item = queue.shift();
//         Array.isArray(item) ? queue.unshift(...item) : newArr.push(item);
//     }

//     return newArr;
// }

async function asyncFunction() {
    console.log("Async function");
    // 产生第一个微任务
    const async1 = await asyncFunction1();
    console.log(async1); //第一个微任务完成
    // 出现await 先去执行promise同步任务，然后等待resolve进入微任务
    // 先处理完成同步任务，然后产生一个新的微任务
    const result = await promiseFunction1(); // 产生第二个微任务
    console.log(result); //第二个微任务完成
    return "Async function completed";
}

async function asyncFunction1() {
    console.log("Async function1");
    // 出现await 先去执行promise同步任务，然后等待resolve进入微任务
    return "Async function1 completed";
}

function promiseFunction() {
    return new Promise((resolve, reject) => {
        console.log("Promise");
        resolve("Promise completed");
    });
}

function promiseFunction1() {
    return new Promise((resolve, reject) => {
        console.log("Promise1");
        resolve("Promise completed1");
    });
}

function timeoutFunction() {
    console.log("Timeout");
}
// 执行同步任务，直到初始化完成第一个微任务
asyncFunction().then((result) => {
    console.log(result);
});

// 执行同步任务2
promiseFunction().then((result) => {
    console.log(result);
});

setTimeout(timeoutFunction);
