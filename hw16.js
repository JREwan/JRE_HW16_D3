var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
//and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below
// Load data from .csv file
d3.csv("HW16_D3.csv", function (error, censusData) {
   if (error) console.error;
   
   // log a list of names
   //console.log(censusData);
   
   // Format the data
   censusData.forEach(function (data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
   });
   var st_abbr = censusData.map(data => data.abbr)
   var x_values = censusData.map(data => data.poverty)
   var y_values = censusData.map(data => data.healthcare)
   console.log("X Values", x_values)
   console.log("Y Values", y_values)
   console.log("State Abbr", st_abbr)
  
  // Create the scales for the chart (linear)
  // x is poverty, y is healthcare
  // the scales translate data values to pixel values for you
  var x_scale = d3.scaleLinear()
            .domain([0, d3.max(x_values)])  // the range of the values to plot
            .range([ 0, width ]);        // the pixel range of the x-axis
          
  var y_scale = d3.scaleLinear()
            .domain([0, d3.max(y_values)])
            .range([ height, 0 ]);
  


  // Create the axes
  var bottomAxis = d3.axisBottom(x_scale);
  var leftAxis = d3.axisLeft(y_scale);

  // Append the axes to the chartGroup
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);
  
  // Create Circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", function(d) {x_scale(d.poverty)})
  .attr("cy", function(d) {y_scale(d.healthcare)})
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".5")

  //console.log("Circles Group", circlesGroup);          
  //console.log("Census Data", censusData);

  
  });





//===============

//===============

  

