var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 70
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
  .attr("class", "dot")
  .attr("cx", d => x_scale(d.poverty))
  .attr("cy", d => y_scale(d.healthcare))
  .attr("r", "10")
  .attr("fill", "blue")
  .attr("opacity", ".5")
  //.attr("text", censusData.st_abbr)
  //
  circlesGroup.append("text")
        .attr("dx", function(d){return -2})
        .text(function(d){return d.abbr})
  
  // Tool Tip Time
  // Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Lack Health Ins: ${d.healthcare}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("mouseover", function (data) {
      toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  //Put labels on the Axes
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 10)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lack Health Insurance (%)");

  chartGroup.append("text")
  .attr("transform", `translate(${width/2}, ${height + margin.bottom - 2})`)
  .attr("class", "axisText")
  .text("In Poverty (%)");

  });
  
  