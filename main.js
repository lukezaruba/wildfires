// Set up the SVG container
const svgWidth = 800;
const svgHeight = 800;
const svg = d3
  .select("#map-container")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let jumpingEnabled = false;

// Define the map data and initial state
let landCoverArray = [
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 3, 3, 4, 4,
  ],
  [
    1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2,
    2, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2,
    2, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 2, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 2, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 2,
    2, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 2,
    2, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 4,
    4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 4,
    4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 3, 3, 3, 3, 5, 5, 3, 3, 2, 2, 4,
    4, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3, 3, 3, 3, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 3, 3, 3, 3, 5, 5, 3, 3, 2, 2, 4,
    4, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3,
  ],
];

// Create a function to render the map
function renderMap() {
  // Select the SVG element and create a group element to contain the map elements
  const mapGroup = svg.append("g");

  // Define a color scale for different land cover types
  const colorScale = d3
    .scaleOrdinal()
    .domain([1, 2, 3, 4, 5, 6]) // Land cover types
    .range(["blue", "green", "yellow", "gray", "brown", "red"]); // Colors for each type

  // Create a rectangle for each cell in the landCoverArray
  const cellWidth = svgWidth / landCoverArray[0].length;
  const cellHeight = svgHeight / landCoverArray.length;

  for (let i = 0; i < landCoverArray.length; i++) {
    for (let j = 0; j < landCoverArray[i].length; j++) {
      const cellType = landCoverArray[i][j];
      const cellColor = colorScale(cellType);

      mapGroup
        .append("rect")
        .attr("x", j * cellWidth)
        .attr("y", i * cellHeight)
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("fill", cellColor)
        .attr("class", "cell");
    }
  }
  // Add a click event listener to the cells
  d3.selectAll(".cell").on("click", function () {
    const cell = d3.select(this);
    const cellData = cell.data()[0]; // Get the data associated with the clicked cell
    const cellX = +cell.attr("x");
    const cellY = +cell.attr("y");

    // Calculate the row and column based on the cell's position
    const rowIndex = Math.floor(cellY / cellHeight);
    const colIndex = Math.floor(cellX / cellWidth);

    // Check if the clicked cell is not water (cell type 1)
    if (landCoverArray[rowIndex][colIndex] !== 1) {
      // Ignite the cell
      landCoverArray[rowIndex][colIndex] = 6;
      cell.attr("fill", colorScale(6)); // Update the color
      manuallyIgnitedCells.add(`${rowIndex}-${colIndex}`);

      startWildfire();
    }
  });
}

// Define a function to start the wildfire simulation
let iteration = 0;
let maxIterations = 100; // Control the number of iterations

const manuallyIgnitedCells = new Set();

function startWildfire() {
  if (iteration === 0 && manuallyIgnitedCells.size === 0) {
    // Start the fire at a random cell (NOT WATER)
    do {
      ignitionCell = [
        Math.floor(Math.random() * landCoverArray.length),
        Math.floor(Math.random() * landCoverArray[0].length),
      ];
    } while (landCoverArray[ignitionCell[0]][ignitionCell[1]] === 1);

    // When appropriate cell found, ignite
    landCoverArray[ignitionCell[0]][ignitionCell[1]] = 6;
  } else {
    // Create a copy of the land cover array for the next iteration
    const newLandCover = JSON.parse(JSON.stringify(landCoverArray));

    // Loop through each cell in the land cover array
    for (let i = 0; i < landCoverArray.length; i++) {
      for (let j = 0; j < landCoverArray[0].length; j++) {
        const cellValue = landCoverArray[i][j];

        // Check if the cell is on fire
        if (cellValue === 6) {
          // Define the neighbors' coordinates
          const neighbors = [
            [i - 1, j],
            [i + 1, j],
            [i, j - 1],
            [i, j + 1],
            [i - 1, j - 1],
            [i - 1, j + 1],
            [i + 1, j - 1],
            [i + 1, j + 1],
          ];

          if (jumpingEnabled) {
            neighbors.push([i - 2, j]);
            neighbors.push([i + 2, j]);
            neighbors.push([i, j - 2]);
            neighbors.push([i, j + 2]);
            neighbors.push([i - 2, j - 2]);
            neighbors.push([i - 2, j + 2]);
            neighbors.push([i + 2, j - 2]);
            neighbors.push([i + 2, j + 2]);
          }

          for (const [neighborI, neighborJ] of neighbors) {
            // Check if the neighbor is within the bounds of the array
            if (
              neighborI >= 0 &&
              neighborI < landCoverArray.length &&
              neighborJ >= 0 &&
              neighborJ < landCoverArray[0].length
            ) {
              const neighborValue = landCoverArray[neighborI][neighborJ];

              // Calculate probability for fire spread
              const spread = Math.random();

              // Implement conditions for fire spread
              if (neighborValue === 2 && spread < 0.25) {
                newLandCover[neighborI][neighborJ] = 6; // 2 = forest
              } else if (neighborValue === 3 && spread < 0.5) {
                newLandCover[neighborI][neighborJ] = 6; // 3 = grassland
              } else if (neighborValue === 4 && spread < 0.025) {
                newLandCover[neighborI][neighborJ] = 6; // 4 = urban
              } else if (neighborValue === 5 && spread < 0.15) {
                newLandCover[neighborI][neighborJ] = 6; // 5 = agriculture
              }
            }
          }
        }
      }
    }

    // Update the land cover data for the next iteration
    landCoverArray = newLandCover;
  }

  // Display the map
  renderMap();
  iteration++;

  // Control the number of iterations
  if (iteration < maxIterations) {
    //requestAnimationFrame(startWildfire);
    timeoutID = setTimeout(startWildfire, 250);
  }
}

function resetSimulation() {
  if (iteration > 0) {
    iteration = 0;
    clearTimeout(timeoutID);
  }

  manuallyIgnitedCells.clear();

  landCoverArray = [
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 3,
    3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 3, 3, 4, 4,
  ],
  [
    1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 4,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2,
    2, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2,
    2, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 2, 2, 2, 2, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 2, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 2, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
    4, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 4, 4, 4, 4,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 2,
    2, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 2,
    2, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 4,
    4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 1, 1, 3, 3, 5, 5, 5, 5, 2, 2, 4,
    4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 3, 3, 3, 3, 5, 5, 3, 3, 2, 2, 4,
    4, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3, 3, 3, 3, 3, 3,
  ],
  [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 1, 1, 3, 3, 3, 3, 5, 5, 3, 3, 2, 2, 4,
    4, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3,
  ],
];

  renderMap();
  location.reload();
}

// Adding actions to button clicks
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startWildfire);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetSimulation);

// Function to update the status text
function updateStatus() {
  const statusElement = document.getElementById("status");
  statusElement.innerHTML = jumpingEnabled ? "<b>True</b>" : "<b>False</b>";
}

// Function to toggle the jumpingEnabled variable
function toggleJumping() {
  jumpingEnabled = !jumpingEnabled;
  updateStatus();
}

// Add a click event listener to the toggle button
const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", toggleJumping);

// Initial rendering
renderMap();
