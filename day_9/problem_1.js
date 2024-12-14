const input = require("./data");

const block_array = [];
let block_id = 0;
input.forEach((i, index) => {
    const element = i;
    if (index % 2 !== 0) {
        block_array.push(...Array.from({ length: element }, () => {
            return { "value": '.', "is_empty": true };
        }));
    } else {
        block_array.push(...Array.from({ length: element }, () => {
            return { "value": block_id, "is_empty": false };
        }));
        block_id++;
    }
});
console.log(block_array);

console.log(block_array.map(i => i.value));

first_instance_of_empty = () => block_array.findIndex(i => i.is_empty && i.value === '.');
last_instance_of_number = () => block_array.findLastIndex(i => !i.is_empty && i.value !== '.');



block_array.filter(k => k.is_empty).forEach(j => {
    const first = first_instance_of_empty();
    const last = last_instance_of_number();
    [block_array[first], block_array[last]] = [block_array[last], block_array[first]];
});

console.log(block_array.filter(i => !i.is_empty).map(i => i.value).reduce((acc, curr, index) => acc + (index * curr), 0));