const fs = require('fs');

// const genValue = (arr, pattern, patternStretch) => {
//     let newarr = [...arr]
//     // for (let i = 0; i < arr.length; i++) {
//         // console.log(pattern[(i + 1) % pattern.length] + "|" + newarr[i])
//         // newarr[i] = pattern[(i + 1) % pattern.length] * newarr[i];
//     // }
//     let sum = 0;
//     for (let i = arr.length - 1; i >= 0; i--) {
//         sum += +arr[i];
//         newarr[i] = Math.abs(sum % 10);
//     }
//     return newarr;
// }

const stretchArr = (arr, stretch) => {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < stretch; j++) {
            newarr.push(arr[i]);
        }
    }
    return newarr;
}

const sumArr = (arr) => {
    let sum = 0;
    for (let val of arr) {
        sum += val;
    }
    return Math.abs(sum % 10);
}

const sum = (arr) => {
    let sum = 0;
    for (let val of arr) {
        sum += val;
    }
    return sum;
}

// const nextPhase = (arr, pattern) => {
//     let finalVals = [];
//     let newarr = [...arr];
//     let newpattern = [...pattern];
//     for (let i = 0; i < arr.length; i++) {
//         newpattern = stretchArr(newpattern, i + 1);
//         // console.log(newarr);
//         // console.log(newpattern);
//         finalVals.push(sumArr(genValue(newarr, newpattern, i + 1)));
//         newpattern = [...pattern];
//     }
//     let nextNum = "";
//     for (let val of finalVals) {
//         nextNum += val;
//     }
//     return nextNum;
// }

fs.readFile('Day 16/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let input = data.split("").map(Number);
    let offset = "";
    for (let i = 0; i < 7; i++) {
        offset += input[i]
    }
    offset = Number(offset);
    console.log("Offset: " + offset);
    let splitData = [];
    for (let i = 0; i < 10000; i++) {
        splitData.push(...input);
    }
    let pattern = [0, 1, 0, -1];
    let sum = 0;
    for (let i = 0; i < 100; i++) {
        console.log(i + "% complete.");
        let newdata = [];
        let sum = 0;
        for (let n = splitData.length - 1; n >= 0; n--) {
            sum += splitData[n];
            newdata[n] = Math.abs(sum % 10);
        }
        splitData = [...newdata];
    }
    let endString = "";
    for (let i = offset; i < offset + 8; i++) {
    // for (let i = 0; i < 8; i++) {
        endString += splitData[i];
    }
    console.log(endString);
})