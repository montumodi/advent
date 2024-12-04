const data = require("./data");
const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
const numbers_regex = /\d+/g;

const matches = data.match(regex);

let result = 0;
let flag = true
for(const match of matches) {
    if(match === "do()") {
        flag = true;
    } else if(match === "don't()") {
        flag = false;
    } else if(flag) {
        console.log(match);
        const numbers = match.match(numbers_regex)
        result = result + parseInt(numbers[0]) * parseInt(numbers[1]);
    }
}

console.log(result);