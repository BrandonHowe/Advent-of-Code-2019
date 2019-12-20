const fs = require('fs');

fs.readFile('Day 8/solution.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let splitData = data.split("");
    const width = 25;
    const height = 6;
    const layers = splitData.length / (width * height);
    let board = [];
    console.log(layers);
    for (let k = 0; k < layers; k++) {
        board.push([]);
        for (let i = 0; i < height; i++) {
            board[k].push([]);
            for (let j = 0; j < width; j++) {
                board[k][i].push(splitData[(k * splitData.length / layers) + (i * width) + j]);
            }
        }
    }
    let lowestLayer = 999999999;
    let lowestVal = 99999999;
    const countZeroes = (arr, num) => {
        let zer = 0;
        for (let val of arr) {
            if (val == num) {
                zer++;
            }
        }
        return zer;
    }
    let onesTwosArr = [];
    for (let i = 0; i < board.length; i++) {
        let zeros = 0;
        let ones = 0;
        let twos = 0;
        for (let line of board[i]) {
            zeros += countZeroes(line, 0);
            ones += countZeroes(line, 1);
            twos += countZeroes(line, 2);
        }
        if (zeros < lowestVal) {
            lowestVal = zeros;
            lowestLayer = i;
        }
        onesTwosArr.push([ones, twos]);
    }
    console.log(lowestLayer);
    console.log(lowestVal);
    console.log(onesTwosArr[lowestLayer][0] * onesTwosArr[lowestLayer][1])
    const parseImage = (layers) => {
        let image = [];
        let undefinedCount = 0;
        for (let i = 0; i < height; i++) {
            image.push([]);
            for (let j = 0; j < width; j++) {
                image[i].push(undefined);
            }
        }
        for (let k = 0; k < layers.length; k++) {
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    switch (layers[k][i][j]) {
                        case "0":
                            if (image[i][j] != "0" && image[i][j] != "1") {
                                image[i][j] = (0);
                            }
                            break;
                        case "1":
                            if (image[i][j] != "0" && image[i][j] != "1") {
                                image[i][j] = 1;
                            }
                            break;
                        case "2":
                            if (image[i][j] != "0" && image[i][j] != "1") {
                                image[i][j] = undefined;
                            }
                            undefinedCount++;
                            break;
                    }
                }
            }
        }
        return image;
    }
    const displayBoard = (arr) => {
        let endLine = "";
        for (let line of arr) {
            for (let char of line) {
                if (char == "0") {
                    endLine += "."
                } else {
                    endLine += "#"
                }
            }
            endLine += "\n";
        }
        return endLine;
    }
    console.log(displayBoard(parseImage(board)));
})
