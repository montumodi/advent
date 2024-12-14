const input = require("./data");

find_locations_by_number = (number) => input.flatMap((row, i) => row.map((value, j) => value === number ? [i, j] : null).filter(Boolean));
last_number_locations = input.flatMap((row, i) => row.map((value, j) => value === 9 ? [i, j] : null).filter(Boolean));
const no_of_rows = input.length;
const no_of_columns = input[0].length;

const data = [];
for (let step = 0; step <= 9; step++) {
    const nextNumber = step + 1;
    const locations = find_locations_by_number(step);

    locations.forEach(([row, col]) => {
        const obj = {
            step,
            location: [row, col]
        };
        const paths = [];
        paths.push((col + 1 < no_of_columns && input[row][col + 1] === nextNumber) ? [row, col + 1] : null);
        paths.push((col - 1 >= 0 && input[row][col - 1] === nextNumber) ? [row, col - 1] : null);
        paths.push((row - 1 >= 0 && input[row - 1][col] === nextNumber) ? [row - 1, col] : null);
        paths.push((row + 1 < no_of_rows && input[row + 1][col] === nextNumber) ? [row + 1, col] : null);
        obj.paths = paths.filter(Boolean);
        data.push(obj);
    });
}

const graph = new Map();
data.forEach(({ step, location, paths }) => {
    const key = `${step}|${location[0]},${location[1]}`;
    graph.set(key, paths.map(path => `${step + 1}|${path[0]},${path[1]}`));
});

const findPaths = (startStep, startLocation, endStep) => {
    const startKey = `${startStep}|${startLocation[0]},${startLocation[1]}`;
    const paths = [];
    const currentPath = [];

    const dfs = (currentKey) => {

        const [currentStep, location] = currentKey.split('|');
        const [row, col] = location.split(',').map(Number);
        currentPath.push({ step: Number(currentStep), location: [row, col] });

        if (Number(currentStep) === endStep) {
            paths.push([...currentPath]);
        } else if (graph.has(currentKey)) {
            for (const nextKey of graph.get(currentKey)) {
                dfs(nextKey);
            }
        }

        currentPath.pop(); // Backtrack
    };

    dfs(startKey);
    return paths;
};

const startStep = 0;
const startLocations = data.filter(i => i.step === startStep);
const endStep = 9;

let total = 0;
startLocations.forEach(({ location }) => {
    let allPaths = [];
    allPaths.push(...findPaths(startStep, location, endStep));
    total = total + [...new Set(allPaths.map(i => i[9].location.join(',')))].length
});

console.log(total);







