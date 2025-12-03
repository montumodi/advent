const { input_array } = require('./data');

const matrix_size_rows = input_array.length;
const matrix_size_columns = input_array[0].length;

function find_vector(a1, a2) {
    const { "x": x1, "y": y1 } = a1;
    const { "x": x2, "y": y2 } = a2;
    return { "x": x2 - x1, "y": y2 - y1 };
}


function find_upwards(vector, element, upwards_array = []) {
    const { "x": v1, "y": v2 } = vector;
    const { "x": x2, "y": y2 } = element;

    const upwards = { "x": x2 - v1, "y": y2 - v2 };
    if (upwards.x >= 0 && upwards.y >= 0 && upwards.x < matrix_size_rows && upwards.y < matrix_size_columns) {
        upwards_array.push(upwards);
        return find_upwards(vector, upwards, upwards_array);
    } else {
        return upwards_array;
    }
}

function find_downwards(vector, element, downwards_array = []) {
    const { "x": x1, "y": y1 } = vector;
    const { "x": x2, "y": y2 } = element;

    const downwards = { "x": x2 + x1, "y": y2 + y1 };
    if (downwards.x >= 0 && downwards.y >= 0 && downwards.x < matrix_size_rows && downwards.y < matrix_size_columns) {
        downwards_array.push(downwards);
        return find_downwards(vector, downwards, downwards_array);
    } else {
        return downwards_array;
    }
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
    antinodes_locations = antinodes_locations.concat(value);
    console.log("Processing anteena:", key, value);
    for (let i = 0; i < value.length; i++) {
        
        for (let j = i + 1; j < value.length; j++) {
            console.log("finding vector", value[i], value[j]);
            const vector = find_vector(value[i], value[j]);

            const upwards = find_upwards(vector, value[i]);
            const downwards = find_downwards(vector, value[j]);
            console.log("Vector:", vector);
            console.log("upwards:", upwards);
            console.log("downwards", downwards);
            console.log("Matrix size:", matrix_size_rows, matrix_size_columns);
            antinodes_locations = antinodes_locations.concat(upwards);
            antinodes_locations = antinodes_locations.concat(downwards);
            // if (vector.x >= 0 && vector.y >= 0 && vector.x < matrix_size_rows && vector.y < matrix_size_columns) {
                
            // }

        }
    }
})

console.log("Total antinodes found:", antinodes_locations.sort((a, b) => a.x - b.x || a.y - b.y));

const unique = Array.from(new Set(antinodes_locations.map(loc => `${loc.x},${loc.y}`)));
console.log("Unique antinodes found:", unique.length);
console.log("Unique antinodes locations:", antinodes_locations.length);



