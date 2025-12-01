let data = require('./data');

const no_of_blinks = 25;

split_into_two = (numToSeparate) => {
    const array = Array.from(String(numToSeparate), Number);
    const half = Math.ceil(array.length / 2);
    const firstHalf = array.splice(0, half);
    const secondHalf = array;
    return [parseInt(firstHalf.join("")), parseInt(secondHalf.join(""))];
}

multiply_by_2024 = (num) => num * 2024;


for (let index = 0; index < no_of_blinks; index++) {
    let new_array = [];
    for(let i = 0; i < data.length; i++) {
        if(data[i] === 0) {
            new_array.push(1);
        } else if(String(data[i]).length % 2 === 0) {
            new_array.push(...split_into_two(data[i]));
        } else {
            new_array.push(multiply_by_2024(data[i]));
        }
    }
    console.log(new_array);
    data = new_array;
}

console.log(data.length);