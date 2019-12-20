const fs = require('fs');

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

function round(num,pre) {
    if( !pre) pre = 0;
    var pow = Math.pow(10,pre);
    return Math.round(num*pow)/pow;
}

function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};

fs.readFile('Day 14/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n").map(l => l.split(" => ").map(m => m.split(", ").map(n => n.split(" "))));
    let targetRow;
    for (let row of splitData) {
        if (row[1][0][1] == "FUEL") {
            targetRow = JSON.parse(JSON.stringify(row));
        }
    }
    console.log(targetRow);
    const findReactants = (output) => {
        for (let row of splitData) {
            if (row[1][0][1] == output) {
                // console.log(row[0]);
                let outputObj = {};
                const lerow = row[0];
                let flatrow = flatDeep(lerow);
                for (let i = 1; i < flatrow.length; i += 2) {
                    outputObj[flatrow[i]] = Number(flatrow[i - 1]);
                }
                // console.log([outputObj, Number(row[1][0][0])]);
                return [outputObj, Number(row[1][0][0])];
            }
        }
    }
    const isSemiBase = (reactant) => {
        for (let row of splitData) {
            if (row[1][0][1] != reactant) {
                continue;
            }
            if (row[0][0][1] == "ORE") {
                return true;
            }
        }
        return false;
    }
    let reactantObj = {};
    // targetRow = targetRow.flat(2);
    // for (let i = 1; i < targetRow.length; i += 2) {
    //     reactantObj[targetRow[i]] = Number(targetRow[i - 1]);
    // }
    // console.log(reactantObj);
    reactantObj = {FUEL: 1};
    const doThing = () => {
        let allsbases = false
        while (allsbases == false) {
            for (let i in reactantObj) {
                if (i == "ORE") {
                    continue;
                }
                if (isSemiBase(i)) {
                    continue;
                }
                let oreactants = findReactants(i);
                // console.log(oreactants);
                for (let j in oreactants[0]) {
                    // console.log(j + "|" + reactantObj[i] * oreactants[0][j] + "|" + oreactants[1])
                    if (reactantObj[j]) {
                        reactantObj[j] += Math.ceil((reactantObj[i] * oreactants[0][j] / oreactants[1] / oreactants[0][j])) * oreactants[0][j];
                    } else {
                        reactantObj[j] = Math.ceil((reactantObj[i] * oreactants[0][j] / oreactants[1] / oreactants[0][j])) * oreactants[0][j];
                    }
                }
                delete reactantObj[i];
                // console.log(oreactants);
            }
            allsbases = true;
            for (let i of Object.keys(reactantObj)) {
                if (!isSemiBase(i)) {
                    allsbases = false;
                }
            }
            // console.log(reactantObj);
        }
        while (Object.keys(reactantObj).length > 1) {
            for (let i in reactantObj) {
                if (i == "ORE") {
                    continue;
                }
                let oreactants = findReactants(i);
                // console.log(oreactants);
                for (let j in oreactants[0]) {
                    // console.log(j + "|" + Math.ceil((reactantObj[i] * oreactants[0][j] / oreactants[1] / oreactants[0][j])) * oreactants[0][j])
                    if (reactantObj[j]) {
                        reactantObj[j] += Math.ceil((reactantObj[i] * oreactants[0][j] / oreactants[1] / oreactants[0][j])) * oreactants[0][j];
                    } else {
                        reactantObj[j] = Math.ceil((reactantObj[i] * oreactants[0][j] / oreactants[1] / oreactants[0][j])) * oreactants[0][j];
                    }
                }
                delete reactantObj[i];
                // console.log(oreactants);
            }
            allsbases = true;
            for (let i of Object.keys(reactantObj)) {
                if (!isSemiBase(i)) {
                    allsbases = false;
                }
            }
            // console.log(reactantObj);
        }
        return reactantObj.ORE;
    }
    let highest = 0;
    let prev = 0;
    // for (let i = 1; i < 1000; i++) {
    let i = Math.floor(1000000000000 / 13312);
    // let i = 0;
    while (true) {
        const currVal = doThing();
        if (currVal > 1000000000000) {
            console.log("Stopped at: " + (i - 1000));
            i -= 1000;
            reactantObj = {FUEL: i};
            highest = prev;
            break;
        } else {
            // console.log(currVal - highest);
            prev = highest;
            highest = currVal;
            // console.log(seen.indexOf(highest));
            // seen.push(highest);
        }
        reactantObj = {FUEL: i};
        i += 1000;
    }
    console.log(highest);
    while (true) {
        const currVal = doThing();
        if (currVal > 1000000000000) {
            console.log("Stopped at: " + (currVal));
            i -= 100;
            reactantObj = {FUEL: i};
            highest = prev;
            break;
        } else {
            // console.log(currVal - highest);
            prev = highest;
            highest = currVal;
            // console.log(seen.indexOf(highest));
            // seen.push(highest);
        }
        reactantObj = {FUEL: i};
        i += 100;
    }
    console.log(highest);
    while (true) {
        const currVal = doThing();
        if (currVal > 1000000000000) {
            console.log("Stopped at: " + (i - 10));
            i -= 10;
            reactantObj = {FUEL: i};
            highest = prev;
            break;
        } else {
            // console.log(currVal - highest);
            prev = highest;
            highest = currVal;
            // console.log(seen.indexOf(highest));
            // seen.push(highest);
        }
        reactantObj = {FUEL: i};
        i += 10;
    }
    while (true) {
        const currVal = doThing();
        if (currVal > 1000000000000) {
            console.log("Stopped at: " + (i - 1));
            i -= 1;
            reactantObj = {FUEL: i};
            highest = prev;
            break;
        } else {
            // console.log(currVal - highest);
            prev = highest;
            highest = currVal;
            // console.log(seen.indexOf(highest));
            // seen.push(highest);
        }
        reactantObj = {FUEL: i};
        i += 1;
    }
    console.log(reactantObj);
    // console.log(findReactants("E"));
})