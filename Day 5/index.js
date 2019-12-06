const fs = require('fs');

const changeVals = (arr, opidx, input) => {
    // console.log("Result: " + (arr[arr[opidx[0] + 1]] + arr[arr[opidx[0] + 2]]));
    const op = arr[opidx[0]];
    const instr = op % 100;
    const p1mode = Math.floor(op / 100 % 10);
    let p2mode, p3mode;
    if (instr != 3 || instr != 4) {
        p2mode = Math.floor(op / 1000 % 10);
        p3mode = Math.floor(op / 10000 % 10);
    }
    // console.log(p1mode + "|" + p2mode + "|" + p3mode);
    let p1value = arr[arr[opidx[0] + 1]];
    let p2value = arr[arr[opidx[0] + 2]];
    // console.log(p1value + "|" + p2value);
    if (p1mode === 1) {
        p1value = arr[opidx[0] + 1];
    }
    if (p2mode === 1) {
        // console.log("aso")
        p2value = arr[opidx[0] + 2];
    }
    if (instr === 1) {
        arr[arr[opidx[0] + 3]] = p1value + p2value;
    } else if (instr === 2) {
        arr[arr[opidx[0] + 3]] = p1value * p2value;
    } else if (instr === 3) {
        arr[arr[opidx[0] + 1]] = input;
    } else if (instr === 4) {
        return arr[arr[opidx[0] + 1]];
    } else if (instr === 5) {
        if (p1value != 0) {
            opidx[0] = p2value;
        } else {
            opidx[0] += 3;
        }
    } else if (instr === 6) {
        if (p1value == 0) {
            opidx[0] = p2value;
        } else {
            opidx[0] += 3;
        }
    } else if (instr === 7) {
        if (p1value < p2value) {
            arr[arr[opidx[0] + 3]] = 1;
        } else {
            arr[arr[opidx[0] + 3]] = 0;
        }
    } else if (instr === 8) {
        if (p1value == p2value) {
            arr[arr[opidx[0] + 3]] = 1;
        } else {
            arr[arr[opidx[0] + 3]] = 0;
        }
    } else if (instr === 99) {
        return "done";
    }
}

const getLength = (arr, opidx) => {
    const op = arr[opidx]
    const instr = op % 100;
    if (instr === 1) {
        return 4;
    } else if (instr === 2) {
        return 4;
    } else if (instr === 3) {
        return 2;
    } else if (instr === 4) {
        return 2;
    } else if (instr === 5 || instr == 6) {
        return 0;
    } else if (instr === 7 || instr == 8) {
        return 4;
    } else if (instr === 99) {
        return 1;
    }
}

fs.readFile('Day 5/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const splitData = data.split(",").map(Number);
    let opcode = 0;
    let input = 5;
    // console.log(splitData);
    opcode = [0];
    let complete = false;
    let nvarr = [...splitData]
    // console.log(nvarr);
    while (complete == false) {
    // for (let i = 0; i < 10; i++) {
        // console.log(nvarr);
        let lelength = getLength(nvarr, opcode[0]);
        // console.log("Length: " + opcode[0] + "|" + lelength);
        let output = changeVals(nvarr, opcode, input);
        if (output == "done") {
            // console.log("First slot: " + nvarr[0]);
            complete = true;
        } else if (output) {
            console.log("Output: " + output);
        }
        opcode[0] += Number(lelength);
    }
})