const input = `
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
M.S.......
.A........
M.S.......`;

function convertTo2DArray(input) {
  // Split the input string into rows, remove any unnecessary newlines or spaces
  const rows = input.trim().split("\n");

  // Split each row into individual characters
  return rows.map(row => row.split(""));
}

const matrix = convertTo2DArray(input);

module.exports = matrix;
