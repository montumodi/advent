const input = require("./data");
const operators = ["*", "+"];

function generate_combinations(numbers, currentIndex = 0, expression = "", results = []) {
    // Base case: If we are at the last number, add the expression to results
    if (currentIndex === numbers.length - 1) {
        results.push(expression + numbers[currentIndex]);
        return;
    }

    // Iterate through all operators and recursively generate combinations
    for (const operator of operators) {
        generate_combinations(
            numbers,
            currentIndex + 1,
            expression + numbers[currentIndex] + operator,
            results
        );
    }

    return results;
}

function evaluate_expression(expressionArray) {
    if (expressionArray.length === 0) return 0;

    // Start with the first number
    let result = parseInt(expressionArray[0], 10);

    // Iterate through the array, applying operators to the result
    for (let i = 1; i < expressionArray.length; i += 2) {
        const operator = expressionArray[i];
        const nextNumber = parseInt(expressionArray[i + 1], 10);

        if (operator === "+") {
            result += nextNumber;
        } else if (operator === "*") {
            result *= nextNumber;
        } else {
            console.error("Unsupported operator:", operator);
            return null;
        }
    }

    return result;
}

let total = 0;
for (let i = 0; i < input.length; i++) {
    // Generate combinations
    const results = generate_combinations(input[i].elements);

    for (let j = 0; j < results.length; j++) {
        const arr = results[j].match(/(\d+|[+*])/g);
        const result = evaluate_expression(arr);
        if (result === input[i].total) {
            console.log("It's a match!", result);
            total = total + result;
            break;
        }
    }
}
// Output
console.log(total);