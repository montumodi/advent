const input = require("./data");
const group_by = require("lodash.groupby");
const block_array = [];
let block_id = 0;
let group_numbers = [];
let group_empty_spaces = [];
input.forEach((i, index) => {
    const element = i;
    if (i === 0) {
        return;
    }
    if (index % 2 !== 0) {
        group_empty_spaces.push({ "group": `group_${index}`, "count": i, "start_index": block_array.length, "end_index": (block_array.length - 1) + element, "spaces_left": i });
        block_array.push(...Array.from({ length: element }, () => {
            return { "value": '.', "group": `group_${index}` };
        }));
    } else {
        group_numbers.push({ "group": `group_${index}`, "value": block_id, "count": i, "start_index": block_array.length, "end_index": (block_array.length - 1) + element });
        block_array.push(...Array.from({ length: element }, () => {
            return { "value": block_id, "group": `group_${index}` };
        }));
        block_id++;
    }
});

const grouped_group_numbers = group_by(group_numbers, i => i.group);
const grouped_group_empty_spaces = group_by(group_empty_spaces, i => i.group);
const keys = Object.keys(grouped_group_numbers);
const empty_spaces = Object.keys(grouped_group_empty_spaces).map(i => grouped_group_empty_spaces[i][0]);
for (let index = keys.length - 1; index >= 0; index--) {
    const element = grouped_group_numbers[keys[index]][0];
    const free_slot = empty_spaces.find(i => i.spaces_left >= element.count);
    if (free_slot && free_slot.start_index < element.start_index) {
        console.log("found a free slot");
        for (let j = free_slot.start_index, k = element.start_index; k <= element.end_index; j++, k++) {
            const temp = block_array[j];
            block_array[j] = block_array[k];
            block_array[k] = temp;
        }
        free_slot.spaces_left -= element.count;
        free_slot.start_index += element.count;
    }
}

console.log(block_array);
console.log(block_array.map(i => i.value).reduce((acc, curr, index) => acc + (index * (curr !== '.' ? curr : 0)), 0));