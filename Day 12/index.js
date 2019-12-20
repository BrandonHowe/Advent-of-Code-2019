const fs = require('fs');

fs.readFile('Day 12/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("\n").map(l => l.split(", "));
    let seen = [];
    // console.log(splitData);
    let moons = [];
    for (let row of splitData) {
        moons.push({});
        moons[moons.length - 1].x = +(row[0].slice(3));
        moons[moons.length - 1].y = +(row[1].slice(2));
        moons[moons.length - 1].z = +(row[2].slice(2, row[2].length - 1));
        moons[moons.length - 1].vx = 0;
        moons[moons.length - 1].vy = 0;
        moons[moons.length - 1].vz = 0;
    }
    const evaluateMoons = (arr) => {
        let newmoons = [...arr];
        let currentSkip = 0;
        for (let i = 0; i < newmoons.length; i++) {
            for (let j = currentSkip; j < newmoons.length; j++) {
                if (j == i) {
                    continue;
                }
                if (arr[i].x < arr[j].x) {
                    newmoons[i].vx++;
                    newmoons[j].vx--;
                } else if (arr[i].x > arr[j].x) {
                    newmoons[i].vx--;
                    newmoons[j].vx++;
                }
                if (arr[i].y < arr[j].y) {
                    newmoons[i].vy++;
                    newmoons[j].vy--;
                } else if (arr[i].y > arr[j].y) {
                    newmoons[i].vy--;
                    newmoons[j].vy++;
                }
                if (arr[i].z < arr[j].z) {
                    newmoons[i].vz++;
                    newmoons[j].vz--;
                } else if (arr[i].z > arr[j].z) {
                    newmoons[i].vz--;
                    newmoons[j].vz++;
                }
            }
            currentSkip++;
        }
        for (let i = 0; i < newmoons.length; i++) {
            newmoons[i].x += newmoons[i].vx;
            newmoons[i].y += newmoons[i].vy;
            newmoons[i].z += newmoons[i].vz;
        }
        return newmoons;
    };
    const calcEnergy = (arr) => {
        let total = 0;
        for (let row of arr) {
            let pot = Math.abs(row.x) + Math.abs(row.y) + Math.abs(row.z);
            let kin = Math.abs(row.vx) + Math.abs(row.vy) + Math.abs(row.vz);
            total += pot * kin;
        }
        return total;
    }
    // console.log(moons);
    let xrepeat = 0;
    let yrepeat = 0;
    let zrepeat = 0;
    let xdone = false;
    let ydone = false;
    let zdone = false;
    let j = 0;
    while (xdone == false || ydone == false || zdone == false) {
        j++;
        if (j % 1000 === 0) {
            // console.log(j);
        }
    // for (let i = 0; i < 1000; i++) {
        seen.push([]);
        for (let thing of moons) {
            // seen[seen.length - 1].push(Object.assign({}), thing);
            seen[seen.length - 1].push({...thing});
        }
        // console.log(seen);
        moons = evaluateMoons(moons);
        // for (let i = 0; i < seen.length - 1; i++) {
            const value = seen[0];
            // console.log("New value");
            let xc = 0;
            let yc = 0;
            let zc = 0;
            for (let moon of value) {
                for (let planet of moons) {
                    // console.log(planet);
                    // console.log(moon);
                    if (moon.x == planet.x && moon.vx == planet.vx && xdone == false) {
                        // console.log(moon.x + "|" + planet.x);
                        xc++;
                    }
                    if (moon.y == planet.y && moon.vy == planet.vy && ydone == false) {
                        yc++;
                    }
                    if (moon.z == planet.z && moon.vz == planet.vz && zdone == false) {
                        zc++;
                    }
                    // console.log(xc + "|" + yc + "|" + zc);
                }
            }
            // console.log(xc + "|" + yc + "|" + zc);
            if (xc == 4) {
                console.log("X: " + j);
                xrepeat = j;
                xdone = true;
            }
            if (yc == 4) {
                console.log("Y: " + j);
                yrepeat = j;
                ydone = true;
            }
            if (zc == 4) {
                console.log("Z: " + j);
                zrepeat = j;
                zdone = true;
            }
        // }
    }
    console.log(xrepeat + "|" + yrepeat + "|" + zrepeat);
    console.log("find the lcm yourself");
})