function fn() {
    console.log("this1: ", this); //{ douyin: "douyin" }
    var arr = [1];
    // 普通 JS
    arr.map(function (item) {
        console.log("this2: ", this); // winodw
        return item + 1;
    });
    // 箭头函数
    arr.map((item) => {
        console.log("this3: ", this); // //{ douyin: "douyin" }
        return item + 1;
    });
}
fn.call({ douyin: "douyin" });
