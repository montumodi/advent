const { input_array } = require("./data");

const start = performance.now()


const no_of_rows = input_array.length;
const no_of_columns = input_array[0].length;

console.log(no_of_rows, no_of_columns);

const obstructions = input_array.flatMap((row, row_index) => row.map((cell, cell_index) => cell === "#" ? { row_index, cell_index } : null)).filter(i => i !== null);

function find_guard_current_location() {
    const guard_row_index = input_array.findIndex(row => row.find(i => i === "^"));

    return { initial_guard_row_index: guard_row_index, initial_guard_column_index: input_array[guard_row_index].findIndex(i => i === "^") };
}

const guard_locations = [];

function move_guard(guard_row_index, guard_column_index, direction) {
    let delta_row = 0;
    let delta_column = 0;

    if (guard_locations.length === 0) {
        guard_locations.push({
            traversed_row_index: initial_guard_row_index,
            traversed_column_index: initial_guard_column_index,
            step: "start"
        });
    }

    // Determine movement deltas based on direction
    switch (direction) {
        case "up":
            delta_row = -1;
            break;
        case "down":
            delta_row = 1;
            break;
        case "left":
            delta_column = -1;
            break;
        case "right":
            delta_column = 1;
            break;
        default:
            console.error("Invalid direction provided.");
            return;
    }

    let current_row_index = guard_row_index;
    let current_column_index = guard_column_index;

    while (true) {
        // Update the current position
        current_row_index += delta_row;
        current_column_index += delta_column;

        // Check bounds
        if (
            current_row_index < 0 || current_row_index >= no_of_rows ||
            current_column_index < 0 || current_column_index >= no_of_columns
        ) {
            break;
        }

        // Check for obstructions
        if (obstructions.find(i => i.row_index === current_row_index && i.cell_index === current_column_index) != null) {
            break;
        }

        // Record the traversed location
        guard_locations.push({
            "traversed_row_index": current_row_index,
            "traversed_column_index": current_column_index,
            "step": direction
        });
    }
}


const { initial_guard_row_index, initial_guard_column_index } = find_guard_current_location();


function has_guard_reached_at_the_end() {
    const latest_guard_location = guard_locations[guard_locations.length - 1];
    has_guard_reached = (latest_guard_location.traversed_row_index === 0 ||
        latest_guard_location.traversed_row_index === no_of_rows - 1) ||
        (latest_guard_location.traversed_column_index === no_of_columns ||
            latest_guard_location.traversed_column_index === no_of_columns - 1);
    return has_guard_reached;
}


move_guard(initial_guard_row_index, initial_guard_column_index, "up");

while (!has_guard_reached_at_the_end()) {

    const latest_guard_location = guard_locations[guard_locations.length - 1];

    let next_direction = "";
    switch (latest_guard_location.step) {
        case "up":
            next_direction = "right";
            break;
        case "right":
            next_direction = "down";
            break;
        case "down":
            next_direction = "left";
            break;
        case "left":
            next_direction = "up";
            break;
        default:
            console.error("Invalid step direction detected.");
            return;
    }

    move_guard(
        latest_guard_location.traversed_row_index,
        latest_guard_location.traversed_column_index,
        next_direction
    );
}

// Ensure unique elements in guard_locations
const uniqueElements = Array.from(
    new Map(guard_locations.map(item => [`${item.traversed_row_index},${item.traversed_column_index}`, item]))
        .values()
);

console.log(guard_locations[guard_locations.length - 1]);
console.log(uniqueElements.length);

const end1 = performance.now();
console.log('Time for P1:', end1 - start);
