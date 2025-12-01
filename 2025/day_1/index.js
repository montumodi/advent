const input = require("./input.js");

class CircularPosition {
    constructor(size = 100, startPosition = 50) {
        this.size = size;
        this.position = startPosition;
        this.zeroCrossings = 0;
        this.counter = 0;
    }

    move(direction, steps) {
        const delta = direction === "L" ? -steps : steps;
        const oldPosition = this.position;

        // Count how many times we cross position 0
        if (delta > 0) {
            // Moving right
            const crossings = Math.floor((oldPosition + delta) / this.size);
            this.zeroCrossings += crossings;
        } else if (delta < 0) {
            // Moving left
            const crossings = Math.floor((oldPosition - 1) / this.size) - Math.floor((oldPosition + delta - 1) / this.size);
            this.zeroCrossings += crossings;
        }

        this.position = ((oldPosition + delta) % this.size + this.size) % this.size;

        if (this.position === 0) {
            this.counter++;
        }
        return this.position;
    }

    getZeroCrossings() {
        return this.zeroCrossings;
    }

    getZeroStoppings() {
        return this.counter;
    }
}

const circle = new CircularPosition(100, 50);
for (const move of input) {
    circle.move(move.direction, move.number);
}
console.log(circle.getZeroStoppings()); // 995
console.log(circle.getZeroCrossings()); // 5847