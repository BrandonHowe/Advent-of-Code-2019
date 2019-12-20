const fs = require('fs');

fs.readFile("Day 10/solution.txt", "utf-8", (err, data) => {
let board = data.split("\n").map(l => l.split(""));
let blocknumArr = data.split("\n").map(l => l.split(""));

function gcd(x, y) {
	if (typeof x !== "number" || typeof y !== "number") return false;
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		var t = y;
		y = x % y;
		x = t;
	}
	return x;
}

const checkLineOfSight = (x1, y1, x2, y2) => {
	if (board[y2][x2] !== "#") {
        return false;
    }
	if (board[y1][x1] !== "#") {
        return false;
    }
	if (y2 === y1 && x2 === x1) {
        return false;
    }
	let dy = y2 - y1;
	let dx = x2 - x1;
	if (dx !== dy || dy !== 0) {
		let newgcd = gcd(dy, dx);
		dy /= newgcd;
		dx /= newgcd;
	}
	let x = x1 + dx;
	let y = y1 + dy;
	let ibtcount = 0;
	while (board[y] && board[y][x]) {
		if (board[y][x] == "#") {
			if (y === y2 && x === x2) {
				return ibtcount;
			}
			ibtcount++;
			return false;
		}
		y += dy;
		x += dx;
	}
}

const getAngle = (x1, y1, x2, y2) => {
	let angle = (Math.atan2(y1 - y2, x1 - x2) * 180) / Math.PI;
	if (angle < 0) angle += 360;
	angle -= 90;
	if (angle < 0) angle += 360;
	// console.log(x1 + "|" + x2 + "|" + y1 + "|" + y2 + "|" + angle);
	return angle;
}

let maxCount = 0;
let y = 16;
let x = 8; // 329 25 31

let count = 0;
let slopes = [];
for (let y2 = 0; y2 < board.length; y2++) {
	for (let x2 = 0; x2 < board[0].length; x2++) {
        // console.log(x + "|" + y + "|" + x2 + "|" + y2);
		let los = checkLineOfSight(x, y, x2, y2);
		if (los === false) {
            continue
        };
		slopes.push([getAngle(x, y, x2, y2), los, x2, y2]);
	}
}
slopes.sort((a, b) => (a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0]));
console.log(slopes[199]);
});