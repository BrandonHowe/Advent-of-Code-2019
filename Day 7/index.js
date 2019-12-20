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
    // console.log("Instr:" + instr + "|" + opidx);
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
        if (input.length === 0) {
            return "waiting";
        }
        arr[arr[opidx[0] + 1]] = input.shift();
    } else if (instr === 4) {
        // console.log(arr);
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
        // console.log(arr);
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
        console.log("99 luftbaloons");
        return 1;
    }
}

class IntCode {
    constructor () {
        this.status = "";
        this.settings = currentSetting;
        this.state = [...splitData];
        this.pos = 0;
        this.input = [];
        this.currInput = [obj.settings[0], continput];
    }
    evalString () {
        let complete = false;
        const opcode = [this.pos];
        const nvarr = this.state;
        // let nvarr = [...splitData]
        let currOutput;
        while (complete == false) {
        // for (let i = 0; i < 10; i++) {
            // console.log(opcode[0]);
            // console.log(nvarr);
            let lelength = getLength(nvarr, opcode[0]);
            // console.log("Length: " + opcode[0] + "|" + lelength);
            // console.log(input);
            // console.log(nvarr);
            let output = changeVals(nvarr, opcode, input);
            if (output == "done") {
                // console.log("First slot: " + nvarr[0]);
                complete = true;
                return {
                    status: "done",
                    output: currOutput,
                    newobj: {
                        settings: input,
                        state: nvarr,
                        pos: opcode[0],
                    }
                };
            } else if (output == "waiting") {
                // console.log(currOutput);
                return {
                    status: "waiting",
                    output: currOutput,
                    newobj: {
                        settings: input,
                        state: nvarr,
                        pos: opcode[0],
                    }
                };
            } else if (output) {
                continput = output;
                currOutput = output;
            }
            opcode[0] += Number(lelength);
        }
    }
}

fs.readFile('Day 7/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const splitData = data.split(",").map(Number);
    let continput = 0;
    // console.log(splitData);
    // console.log(nvarr);
    const evalString = (nvarr, input, opcode) => {
        let complete = false;
        console.log(opcode);
        // let nvarr = [...splitData]
        let currOutput;
        while (complete == false) {
        // for (let i = 0; i < 10; i++) {
            // console.log(opcode[0]);
            // console.log(nvarr);
            let lelength = getLength(nvarr, opcode[0]);
            // console.log("Length: " + opcode[0] + "|" + lelength);
            // console.log(input);
            // console.log(nvarr);
            let output = changeVals(nvarr, opcode, input);
            if (output == "done") {
                // console.log("First slot: " + nvarr[0]);
                complete = true;
                return {
                    status: "done",
                    output: currOutput,
                    newobj: {
                        settings: input,
                        state: nvarr,
                        pos: opcode[0],
                    }
                };
            } else if (output == "waiting") {
                // console.log(currOutput);
                return {
                    status: "waiting",
                    output: currOutput,
                    newobj: {
                        settings: input,
                        state: nvarr,
                        pos: opcode[0],
                    }
                };
            } else if (output) {
                continput = output;
                currOutput = output;
            }
            opcode[0] += Number(lelength);
        }
    }
    function perm(xs) {
      let ret = [];

      for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if(!rest.length) {
          ret.push([xs[i]])
        } else {
          for(let j = 0; j < rest.length; j = j + 1) {
            ret.push([xs[i]].concat(rest[j]))
          }
        }
      }
      return ret;
    }
    const rotate = (arr) => {
        arr.push(arr.shift())
        return arr;
    } 
    let largestOutput = 0;
    let settings = perm([5,6,7,8,9]);
    let highestSetting = [];
    while (settings.length > 0) {
        // console.log(settings.length);
        continput = 0;
        let currentSetting = settings.pop();
        let objslist = [];
        for (let i = 0; i < 5; i++) {
            objslist.push({
                status: "",
                settings:currentSetting,
                state: [...splitData],
                pos:0,
            })
        }
        let arcSetting = [...currentSetting];
        let halted = false;
        let currentIter = 0;
        while (halted === false) {
        // for (let i = 0; i < 6; i++) {
            for (let obj of objslist) {
                // if (halted == true) {
                //     continue;
                // }
                console.log(continput);
                let currInput = [obj.settings[0], continput];
                if (obj.status == "waiting") {
                    currInput.shift();
                }
                console.log("pos: " + obj.pos);
                const toutput = evalString(obj.state, currInput, [obj.pos]);
                let output;
                let newobj;
                let newpos;
                let status;
                if (toutput) {
                    status = toutput.status;
                    output = toutput.output;
                    newobj = toutput.newobj;
                    newpos = toutput.newobj.pos;
                }
                obj.status = toutput.status;
                obj.state = newobj.state;
                obj.pos = newpos;
                currentIter++;
                // console.log(newobj);
                obj.settings = rotate(obj.settings);
                // console.log(output + "|" + status);
                if (output > largestOutput) {
                    // console.log("Output: " + output);
                    // console.log(arcSetting);
                    highestSetting = [...arcSetting];
                    largestOutput = output;
                }
                if (currentIter % 5 == 0 && status == "done") {
                    halted = true;
                    break;
                }
            }
        }
    }
    console.log(largestOutput);
    console.log(highestSetting);
})