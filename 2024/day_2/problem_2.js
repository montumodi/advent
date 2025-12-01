const list = require('./data');

function do_stuff(arr) {
    let is_it_safe = false;
    const arr_length = arr.length;
    let increasing_order = false;
    let decreasing_order = false;
    let increasing_counter = 0;
    let decreasing_counter = 0;
    for (k = 0; k < arr_length - 1; k++) {
        const current = arr[k];
        const next = arr[k + 1];
       

        if (next > current && (next - current <= 3)) {
            increasing_order = true;
            increasing_counter++;
        } else if (next < current && (current - next <= 3)) {
            decreasing_order = true;
            decreasing_counter++;
        }

        if(increasing_counter && decreasing_counter) {
            break;
        }
        if (increasing_counter === arr_length - 1 || decreasing_counter === arr_length - 1) {
            is_it_safe = true;
        }

    }
    return is_it_safe;
}

const results = [];
for (var j = 0; j < list.length; j++) {
     let result = do_stuff(list[j]);
    if(!result) {
        result = try_again_by_removing_fields(list[j]);
    }
    results.push(result);
}

function try_again_by_removing_fields(item) {
    let is_it_safe_now = false;
    for (var l = 0; l < item.length; l++) {
        const result = do_stuff(item.filter((_, index) => index !== l));
        if(result) {
            is_it_safe_now = true;
            break;
        }
    }
    return is_it_safe_now;
}

console.log("Safe: ", results.filter(i => i).length);
console.log("Unsafe: ", results.filter(i => !i).length);
console.log("Total: ", results.length);
