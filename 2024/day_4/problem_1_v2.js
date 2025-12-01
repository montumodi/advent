const matrix = require('./data.js');

// Word to find and ignore
const word_to_find = "X";

const x_positions = [];
for (let row_index = 0; row_index < matrix.length; row_index++) {
    const row = matrix[row_index];
    for (let column_index = 0; column_index < row.length; column_index++) {
        const column = row[column_index];
        if (column === word_to_find) {
            x_positions.push([row_index, column_index]);
        }
    }
}
let counter = 0;

for (let x_position of x_positions) {
    const [row_coordinate, column_coordinate] = x_position;

    // Find 4 words in all directions
    check_direction(row_coordinate, column_coordinate, -1, 0, "left"); // left
    check_direction(row_coordinate, column_coordinate, 1, 0, "right"); // right
    check_direction(row_coordinate, column_coordinate, 0, -1, "above"); // above
    check_direction(row_coordinate, column_coordinate, 0, 1, "below"); // below
    check_direction(row_coordinate, column_coordinate, -1, -1, "diagonal_left_above"); // diagonal left above
    check_direction(row_coordinate, column_coordinate, 1, -1, "diagonal_right_above"); // diagonal right above
    check_direction(row_coordinate, column_coordinate, -1, 1, "diagonal_left_below"); // diagonal left below
    check_direction(row_coordinate, column_coordinate, 1, 1, "diagonal_right_below"); // diagonal right below
}

console.log("Number of XMAS found", counter);

// Generic function to check all directions
function check_direction(row_coordinate, column_coordinate, row_step, col_step, direction) {
    const word_sequence = ["X", "M", "A", "S"];
    let valid = true;
    
    // Loop through 4 steps in the specified direction
    for (let i = 1; i < word_sequence.length; i++) {
        const new_row = row_coordinate + row_step * i;
        const new_col = column_coordinate + col_step * i;

        // Check bounds
        if (new_row < 0 || new_row >= matrix.length || new_col < 0 || new_col >= matrix[0].length) {
            valid = false;
            break;
        }

        // Check if the character matches the expected word sequence
        if (matrix[new_row][new_col] !== word_sequence[i]) {
            valid = false;
            break;
        }
    }

    // If valid, print the result and increment the counter
    if (valid) {
        console.log(`Found XMAS ${direction} from [${row_coordinate}, ${column_coordinate}]`);
        counter++;
    }
}
