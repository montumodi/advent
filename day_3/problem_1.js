const input = require("./data");
// const input = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const regex = /mul\(\d+,\s*\d+\)/g;
const numbers_regex = /\d+/g;
const matches = input.match(regex);

const numbers = matches.map(element => element.match(numbers_regex));

const result = numbers.reduce((acc, curr) => {
    const result = curr[0] * curr[1];
    return acc + result;
}, 0);

console.log(result);