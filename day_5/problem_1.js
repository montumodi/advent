const {rules_array, page_numbers_array} = require("./data");
let result = 0;
for (let index = 0; index < page_numbers_array.length; index++) {
    const elements = page_numbers_array[index];
    const page_numbers_with_rules = rules_array.filter(x => elements.some(j => j === x[0]) && elements.some(j => j === x[1]));
    let is_in_order = true;
    for (let k = 0; k < page_numbers_with_rules.length; k++) {
        if (elements.indexOf(page_numbers_with_rules[k][0]) > elements.indexOf(page_numbers_with_rules[k][1])) {
            is_in_order = false;
            break;
        } 
    }

    if(is_in_order) {
        const middle_element = elements[Math.floor(elements.length / 2)];
        result = result + middle_element;
    }
}

console.log(result);