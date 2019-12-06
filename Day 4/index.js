const fs = require('fs');

fs.readFile('Day 4/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("-");
    const validateNum = (num) => {
        let s = num.split("");
        let d = false;
        for (let i = 0; i < s.length; i++) {
            if (s[i] < s[i - 1]) {
                return false;
            }
            if (s[i] == s[i - 1]) { // comment for part 2
            // if (s[i] == s[i - 1] && s[i] !== s[i - 2] && s[i] !== s[i + 1]) { // Uncomment for part 2
                d = true;
            }
        }
        if (d === true) {
            return true;
        } else {
            return false;
        }
    }
    let v = 0;
    for (let i = Number(splitData[0]); i < Number(splitData[1]); i++) {
        // console.log(i);
        if (validateNum(i.toString()) === true) {
            v++;
        }
    }
    console.log(v);
})