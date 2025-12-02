const input = require("./input.js");
const list_of_invalid_ids = [];

function divide_string_in_equal_parts(input_id_string, number_of_parts) {

    const length = input_id_string.length;
    const partSize = Math.ceil(length / number_of_parts);
    const parts = [];

    for (let i = 0; i < length; i += partSize) {
        parts.push(input_id_string.substring(i, i + partSize));
    }

    return parts;

}

input.forEach(ids => {
    ids.forEach(id => {
        const string_id = id.toString();
        if (string_id.startsWith("0")) {
            list_of_invalid_ids.push(id);
        } else if (string_id.length >= 2) {
            for (let index = string_id.length; index > 1; index--) {
                if (string_id.length % index === 0) {
                    const parts = divide_string_in_equal_parts(string_id, index);
                    if (parts.filter(part => part === parts[0]).length === parts.length) {
                        list_of_invalid_ids.push(id);
                        break;
                    }
                }
            }
        }
    })

});

console.log(list_of_invalid_ids.reduce((accumulator, currentValue) => accumulator + currentValue, 0));