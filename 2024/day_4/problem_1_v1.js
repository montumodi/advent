const matrix = require('./data.js');

// // Example Usage
// const matrix = [
//     [".", ".", "X", ".", "."],
//     [".", "S", "A", "M", "X"],
//     [".", "A", ".", "A", "."],
//     ["X", "M", "A", "S", "S"],
//     [".", "X", ".", ".", "."]
// ];

const word_to_find = "X";  // We're looking for "X"

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

    // find 4 words left of x_position
    find_to_left(column_coordinate, row_coordinate);

    // find 4 words right of x_position
    find_to_right(column_coordinate, row_coordinate);

    // find 4 words above x_position
    find_above(column_coordinate, row_coordinate);

    // find 4 words below x_position
    find_below(column_coordinate, row_coordinate);

    // find 4 words diagnol left below x_position
    find_diagonal_left_below(column_coordinate, row_coordinate);

    // find 4 words diagnol right below x_position
    find_diagonal_right_below(column_coordinate, row_coordinate);

    // find 4 words diagnol left above x_position
    find_diagonal_left_above(column_coordinate, row_coordinate);

    // find 4 words diagnol right above x_position
    find_diagonal_right_above(column_coordinate, row_coordinate);


}

console.log("number of XMAS found", counter);

function find_to_left(column_coordinate, row_coordinate) {
    if (column_coordinate >= 3) {
        if (matrix[row_coordinate][column_coordinate - 1] === "M") {
            if (matrix[row_coordinate][column_coordinate - 2] === "A") {
                if (matrix[row_coordinate][column_coordinate - 3] === "S") {
                    console.log(`Found XMAS on left {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go left..");
    }
}

function find_to_right(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate].length - column_coordinate >= 3) {
        if (matrix[row_coordinate][column_coordinate + 1] === "M") {
            if (matrix[row_coordinate][column_coordinate + 2] === "A") {
                if (matrix[row_coordinate][column_coordinate + 3] === "S") {
                    console.log(`Found XMAS on right {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go right..");
    }
}

function find_above(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate - 3] != null) {
        console.log("Can go above..", row_coordinate, column_coordinate);
        if (matrix[row_coordinate - 1][column_coordinate] === "M") {
            console.log("Found M");
            if (matrix[row_coordinate - 2][column_coordinate] === "A") {
                console.log("Found MA");
                if (matrix[row_coordinate - 3][column_coordinate] === "S") {
                    console.log(`Found XMAS above {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go above..");
    }
}

function find_below(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate + 3] != null) {
        console.log("Can go below..", row_coordinate, column_coordinate);
        if (matrix[row_coordinate + 1][column_coordinate] === "M") {
            console.log("Found M");
            if (matrix[row_coordinate + 2][column_coordinate] === "A") {
                console.log("Found MA");
                if (matrix[row_coordinate + 3][column_coordinate] === "S") {
                    console.log(`Found XMAS below {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go below..");
    }
}

function find_diagonal_left_below(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate + 3] != null && column_coordinate >= 3) {
        console.log("Can go below..", row_coordinate, column_coordinate);
        if (matrix[row_coordinate + 1][column_coordinate - 1] === "M") {
            console.log("Found M");
            if (matrix[row_coordinate + 2][column_coordinate - 2] === "A") {
                console.log("Found MA");
                if (matrix[row_coordinate + 3][column_coordinate - 3] === "S") {
                    console.log(`Found XMAS left diagonally below {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go left diagonally below..");
    }
}

function find_diagonal_right_below(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate + 3] != null && matrix[row_coordinate].length - column_coordinate >= 3) {
        console.log("Can go below..", row_coordinate, column_coordinate);
        if (matrix[row_coordinate + 1][column_coordinate + 1] === "M") {
            console.log("Found M");
            if (matrix[row_coordinate + 2][column_coordinate + 2] === "A") {
                console.log("Found MA");
                if (matrix[row_coordinate + 3][column_coordinate + 3] === "S") {
                    console.log(`Found XMAS right diagonally below {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go right diagonally below..");
    }
}

function find_diagonal_left_above(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate - 3] != null && column_coordinate >= 3) {
        console.log("Can go below..", row_coordinate, column_coordinate);
        if (matrix[row_coordinate - 1][column_coordinate - 1] === "M") {
            console.log("Found M");
            if (matrix[row_coordinate - 2][column_coordinate - 2] === "A") {
                console.log("Found MA");
                if (matrix[row_coordinate - 3][column_coordinate - 3] === "S") {
                    console.log(`Found XMAS left diagonally above {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go left diagonally above..");
    }
}

function find_diagonal_right_above(column_coordinate, row_coordinate) {
    if (matrix[row_coordinate - 3] != null && matrix[row_coordinate - 3] != null) {
        console.log("Can go below..", row_coordinate, column_coordinate);
        if (matrix[row_coordinate - 1][column_coordinate + 1] === "M") {
            console.log("Found M");
            if (matrix[row_coordinate - 2][column_coordinate + 2] === "A") {
                console.log("Found MA");
                if (matrix[row_coordinate - 3][column_coordinate + 3] === "S") {
                    console.log(`Found XMAS right diagonally above {[${row_coordinate}, ${column_coordinate}]}`);
                    counter++;
                }
            }
        }

    } else {
        console.log("Can't go right diagonally above..");
    }
}

