const input = require("./input.js");
const list_of_invalid_ids = [];

input.forEach(ids => {
    ids.forEach(id => {
        const string_id = id.toString();
        if (string_id.startsWith("0")) {
            list_of_invalid_ids.push(id);
        } else if (string_id.length % 2 === 0) {
            const string_length = string_id.length;
            const first_part = string_id.substring(0, (string_length / 2))
            const second_part = string_id.substring(string_length / 2, string_length)
            if (first_part === second_part) {
                list_of_invalid_ids.push(id);
            }
        }
    })

});

console.log(list_of_invalid_ids.reduce((accumulator, currentValue) => accumulator + currentValue, 0));