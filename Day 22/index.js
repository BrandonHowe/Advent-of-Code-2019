const fs = require('fs');

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

var fastModularExponentiation = function(a, b, n) {
    a = a.mod(n);
    var result = 1;
    var x = a;
  
    while(b > 0){
      var leastSignificantBit = b.mod(2);
      b = Math.floor(b / 2);
  
      if (leastSignificantBit == 1) {
        result = result * x;
        result = result.mod(n);
      }
  
      x = x * x;
      x = x.mod(n);
    }
    return result;
};

const deal = (deck) => {
    let newdeck = [];
    for (let value of deck) {
        newdeck.unshift(value);
    }
    return newdeck;
}

const cut = (deck, num) => {
    let newdeck = [...deck];
    if (num > 0) {
        for (let i = 0; i < num; i++) {
            newdeck.push(newdeck.shift());
        }
    } else {
        for (let i = 0; i < Math.abs(num); i++) {
            newdeck.unshift(newdeck.pop());
        }
    }
    return newdeck;
}

const dinc = (deck, inc) => {
    let newdeck = [];
    for (let i = 0; i < deck.length; i++) {
        newdeck.push(0);
    }
    for (let i = 0; i < deck.length; i++) {
        newdeck[(i * inc).mod(deck.length)] = deck[i];
    }
    return newdeck;
}

const minv = (num, modu) => {
    let ouput = fastModularExponentiation(num, modu - 2, modu);
    return ouput;
}

const getSequence = (iterations, increment, offset, size) => {
    let leinc = fastModularExponentiation(iterations, increment, size);
    let leoffset = fastModularExponentiation(offset * (1 - leinc), minv((1 - increment).mod(size), size), size);
    console.log(leinc + "|" + leoffset);
    return [leinc, leoffset]
}

const get = (offset, increment, i, size) => {
    let ouput = i * increment;
    ouput += offset;
    ouput = ouput.mod(size);
    return ouput;
}

fs.readFile('solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n").map(l => l.split(" "));
    let commands = [];
    for (let row of splitData) {
        if (row[0] == "cut") {
            commands.push({cmd: "cut", amount: +row[1]});
        } else if (row[0] == "deal") {
            if (row[1] == "into") {
                commands.push({cmd: "deal"});
            } else if (row[1] == "with") {
                commands.push({cmd: "dinc", amount: +row[3]});
            }
        }
    }
    let offset = 0;
    let increment = 1;
    let deck = [];
    const iterations = 101741582076661;
    const size = 119315717514047;
    // for (let i = 0; i < size; i++) {
    //     deck.push(i);
    // }
    for (let row of commands) {
        if (row.cmd == "deal") {
            // deck = deal(deck);
            increment *= -1;
            increment = increment.mod(size);
            offset += increment;
            offset = increment.mod(size);
        } else if (row.cmd == "dinc") {
            // deck = dinc(deck, row.amount);
            increment *= minv(row.amount, size);
            increment = increment.mod(size);
        } else if (row.cmd == "cut") {
            // deck = cut(deck, row.amount);
            offset += increment * row.amount;
            offset = offset.mod(size);
        }
        // console.log(deck);
        console.log("INC: " + increment);
    }
    // for (let i in deck) {
    //     if (deck[i] == 2019) {
    //         console.log("Gotem: " + i);
    //         break;
    //     }
    // }
    let info = getSequence(iterations, increment, offset, size);
    console.log(info);
    console.log(get(info[1], info[0], 2020, size));
    // console.log(deck);
    // console.log(deck[2019]);
})