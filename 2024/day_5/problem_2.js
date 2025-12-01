const { rules_array, page_numbers_array } = require("./data");
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

    if (!is_in_order) {
        const sorted_order = make_them_in_order(page_numbers_with_rules);
        const middle_element = sorted_order[Math.floor(sorted_order.length / 2)];
        result = result + middle_element;
        console.log(result);
    }
}

function make_them_in_order(pairs) {

    const graph = new Map();
    pairs.forEach(([a, b]) => {
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []); // Ensure all nodes are included
        graph.get(a).push(b);
    });

    const visited = new Set();
    const stack = [];
    let hasCycle = false;

    const dfs = (node, visiting) => {
        if (visited.has(node)) return; // Already processed
        if (visiting.has(node)) {
            hasCycle = true; // Cycle detected
            return;
        }
        visiting.add(node); // Mark node as being visited
        for (const neighbor of graph.get(node)) {
            dfs(neighbor, visiting);
        }
        visiting.delete(node); // Remove from visiting
        visited.add(node); // Mark as processed
        stack.push(node); // Add to the result
    };

    for (const node of graph.keys()) {
        if (!visited.has(node)) dfs(node, new Set());
    }

    if (hasCycle) {
        console.error("Cycle detected; no valid sequence exists.");
    } else {
        return stack.reverse(); // Return the result in topological order
    }


}

console.log(result);