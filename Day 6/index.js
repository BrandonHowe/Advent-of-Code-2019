const fs = require('fs');

fs.readFile('Day 6/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n");
    let input = [];
    for (let value of splitData) {
        input.push(value.split(")"));
    }
    let planets = {};
    let sum = 0;
    const getIndOrbs = (value) => {
        sum++
        if (planets[value].dorb === "COM") {
            return sum;
        }
        return getIndOrbs(planets[value].dorb);
    }
    let path = [];
    const getPath = (value) => {
        path.push(value);
        if (planets[value].dorb === "COM") {
            path.shift();
            return path;
        }
        return getPath(planets[value].dorb);
    }
    const intersect = (value, value2) => {
        path = [];
        let path1 = getPath(value);
        path = [];
        let path2 = getPath(value2);
        console.log(path1);
        console.log(path2);
        path = [];
        let inter = path1.filter(val => path2.includes(val))
        console.log(inter);
        let pathinter = getPath(inter[0]);
        path = [];
        let dist1 = path1.length - pathinter.length;
        let dist2 = path2.length - pathinter.length;
        return dist1 + dist2 - 2;
        // console.log(shortest);
    }
    // console.log(input);
    for (let value of input) {
        for (let i = 0; i < 2; i++) {
            if (!planets[value[i]]) {
                planets[value[i]] = {};
            }
        }
    }
    for (let value of input) {
        // console.log(value);
        planets[value[1]].dorb = value[0];
        planets[value[0]].borb = value[1];
    }
    let total = 0;
    for (let i in planets) {
        sum = 0;
        if (i === "COM") {
            continue;
        }
        // console.log(i);
        total += getIndOrbs(i);
    }
    console.log(intersect("YOU", "SAN"));
})