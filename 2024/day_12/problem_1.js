const data = require('./data');

const rows = data.length;
const cols = data[0].length;

// Direction vectors for top, down, left, right movements
const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1] // Top, Down, Left, Right
];

find_price = function (input) {
    let total_perimeter = 0;
    const dataSet = new Set(input.map(([row, col]) => `${row},${col}`)); // Create a Set for fast lookup
    let letter_perimeter = 0;

    for (let index = 0; index < input.length; index++) {
        const [row, column] = input[index];
        left = [row, column - 1];
        right = [row, column + 1];
        top = [row - 1, column];
        bottom = [row + 1, column];
        if ([left, right, top, bottom].filter(element => dataSet.has(`${element[0]},${element[1]}`)).length > 0) {
            [left, right, top, bottom].forEach(k => {
                if (!dataSet.has(`${k[0]},${k[1]}`)) {
                    letter_perimeter++;
                }
            });
        } else {
            console.log(`At ${row},${column} is alone`);
            letter_perimeter = letter_perimeter + 4;
        }
    }
    console.log(`perimeter of ${letter_perimeter} and a total of ${input.length} elements and a price of ${letter_perimeter * input.length}`);

    total_perimeter += letter_perimeter;
    return total_perimeter * input.length;
}

const floodFill = (row, col, value, visited) => {
    const group = [];
    const stack = [[row, col]];
    visited[row][col] = true;

    while (stack.length > 0) {
        const [curRow, curCol] = stack.pop();
        group.push([curRow, curCol]);

        for (const [dRow, dCol] of directions) {
            const newRow = curRow + dRow;
            const newCol = curCol + dCol;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                !visited[newRow][newCol] &&
                data[newRow][newCol] === value
            ) {
                stack.push([newRow, newCol]);
                visited[newRow][newCol] = true;
            }
        }
    }

    return group;
};

const findGroups = (grid) => {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const groups = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!visited[row][col]) {
                const value = grid[row][col];
                const group = floodFill(row, col, value, visited);
                groups.push(group);
            }
        }
    }

    return groups;
};

// Get connected groups
const groups = findGroups(data);


let final_price = 0;

// Display the groups
groups.forEach((group, index) => {
    const price = find_price(group);
    final_price = final_price + price;
});
console.log(final_price);