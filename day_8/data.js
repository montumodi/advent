const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const input_array = input.trim().split("\n").map(row => row.split(""));

module.exports = {input_array};