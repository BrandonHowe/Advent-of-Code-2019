const fs = require('fs');

const getFuel = (num) => {
    let sum = 0;
    while (num > 0) {
        if (Math.floor(num / 3 - 2) < 0) {
            return sum;
        }
        sum += Math.floor(num / 3) - 2;
        num = Math.floor(num / 3) - 2;
    }
    return sum;
}

fs.readFile('Day 1/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n");
    for (let value in splitData) {
        splitData[value] = Number(splitData[value]);
    }
    let sum = 0;
    for (let value of splitData) {
        sum += getFuel(value);
    }
    console.log(sum);
})