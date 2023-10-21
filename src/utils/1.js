// function myFlat(arr) {
//     const newArr = [];

//     arr.forEach((item) => {
//         Array.isArray(item) ? newArr.push(...myFlat(item)) : newArr.push(item);
//     });
//     return newArr;
// }
const arr = [1, [2, [3, 4], 5], [6, 7], [8]];

console.log(myFlat(arr));

function myFlat(arr) {
    const newArr = [];
    const queue = [...arr];
    while (queue.length) {
        const item = queue.shift();
        Array.isArray(item) ? queue.unshift(...item) : newArr.push(item);
    }

    return newArr;
}
