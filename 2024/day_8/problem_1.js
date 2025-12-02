const { input_array } = require('./data');

const matrix_size_rows = input_array.length;
const matrix_size_columns = input_array[0].length;

function find_vector(a1, a2) {
    const { "x": x1, "y": y1 } = a1;
    const { "x": x2, "y": y2 } = a2;
    console.log("x1,y1:", x1, y1, "x2,y2:", x2, y2);
    return { "x": x2 - x1, "y": y2 - y1 };
}

function find_upwards(vector, element) {
    const { "x": v1, "y": v2 } = vector;
    const { "x": x2, "y": y2 } = element;

    return { "x": x2 - v1, "y": y2 - v2 };
}

function find_downwards(vector, element) {
    const { "x": x1, "y": y1 } = vector;
    const { "x": x2, "y": y2 } = element;

    return { "x": x2 + x1, "y": y2 + y1 };
}

const anteena_array = new Map();

input_array.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        const element = input_array[rowIndex][columnIndex];
        if (element !== ".") {
            if (anteena_array.get(element)) {
                anteena_array.get(element).push({ "x": rowIndex, "y": columnIndex })
            } else {
                anteena_array.set(element, [{ "x": rowIndex, "y": columnIndex }]);
            }
        }
    });
});

let antinodes_locations = [];
anteena_array.forEach((value, key) => {
    console.log("Processing anteena:", key, value);
    for (let i = 0; i < value.length; i++) {
        for (let j = i + 1; j < value.length; j++) {
            console.log("finding vecotr", value[i], value[j]);
            const vector = find_vector(value[i], value[j]);
            const upwards = find_upwards(vector, value[i]);
            const downwards = find_downwards(vector, value[j]);
            console.log("Vector:", vector);
            console.log("upwards:", upwards);
            console.log("downwards", downwards);
            console.log("Matrix size:", matrix_size_rows, matrix_size_columns);

            if (upwards.x >= 0 && upwards.y >= 0 && upwards.x < matrix_size_rows && upwards.y < matrix_size_columns) {
                antinodes_locations.push(upwards);
            }

            if (downwards.x >= 0 && downwards.y >= 0 && downwards.x < matrix_size_rows && downwards.y < matrix_size_columns) {
                antinodes_locations.push(downwards);
            }

        }
    }
})

console.log("Total antinodes found:", antinodes_locations.sort((a, b) => a.x - b.x || a.y - b.y));

const unique = Array.from(new Set(antinodes_locations.map(loc => `${loc.x},${loc.y}`)));
console.log("Unique antinodes found:", unique.length);
console.log("Unique antinodes locations:", antinodes_locations.length);



