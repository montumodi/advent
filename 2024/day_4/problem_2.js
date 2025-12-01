const matrix = require('./data.js');


function solve(matrix) {
    const patterns = ["MMSSA", "MSMSA", "SSMMA", "SMSMA"];
    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;
  
    // Check diagonals and center character for matches
    for (let x = 1; x < rows - 1; x++) {
      for (let y = 1; y < cols - 1; y++) {
        const diagonals = [
          matrix[x - 1][y - 1], // top-left
          matrix[x - 1][y + 1], // top-right
          matrix[x + 1][y - 1], // bottom-left
          matrix[x + 1][y + 1], // bottom-right
          matrix[x][y]          // center
        ].join("");
  
        if (patterns.includes(diagonals)) {
          count++;
        }
      }
    }
  
    return count;
  }

const counter = solve(matrix);

console.log("number of MAS found", counter);

