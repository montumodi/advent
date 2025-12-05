const input = require('./input');


let answer = 0;
for (let i = 0; i < input.length; i++) {
    let two_digit_numbers = [];
    for (let j = 0; j < input[i].length; j++) {
        for (let k = j + 1; k < input[i].length; k++) {
            two_digit_numbers.push(Number.parseInt(`${input[i][j]}${input[i][k]}`));
        }
    }
    answer = answer + two_digit_numbers.sort((a, b) => b - a)[0];
}

console.log(answer);

