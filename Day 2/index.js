const fs = require('fs');

const changeVals = (arr, opidx) => {
    // console.log("Result: " + (arr[arr[opidx + 1]] + arr[arr[opidx + 2]]));
    if (arr[opidx] === 1) {
        arr[arr[opidx + 3]] = (arr[arr[opidx + 1]] + arr[arr[opidx + 2]]);
    } else if (arr[opidx] === 2) {
        arr[arr[opidx + 3]] = (arr[arr[opidx + 1]] * arr[arr[opidx + 2]]);
    } else if (arr[opidx] === 99) {
        return "done";
    }
}

fs.readFile('Day 2/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const splitData = data.split(",").map(Number);
    let opcode = 0;
    // console.log(splitData);
    for (let i = 0; i < 99; i++) {
        for (let j = 0; j < 99; j++) {
            console.log(i + "|" + j);
            opcode = 0;
            let complete = false;
            let nvarr = [...splitData];
            nvarr[1] = i;
            nvarr[2] = j;
            while (complete == false) {
                if (changeVals(nvarr, opcode) == "done") {
                    // console.log("First slot: " + nvarr[0]);
                    complete = true;
                }
                opcode += 4;
            }
            console.log(nvarr[0]);
            if (nvarr[0] === 19690720) {
                console.log("Noun: " + i + " Verb: " + j);
                return;
            }
        }
    }
})