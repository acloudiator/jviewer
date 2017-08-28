/*
 * This is the data for 3 lines. Each line connects
 * 2 points
 */
var lines = [
  [{ "x":20, "y":20}, {"x":70, "y":40}],
  [{ "x": 40, "y": 40}, { "x": 60, "y": 70}],
  [{ "x": 80, "y": 20}, { "x": 80, "y": 60}]
]

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0,width])
    .domain([0,100]);

var y = d3.scale.linear()
    .range([height,0])
    .domain([0,100]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function (d) { return x(d.x); })
    .y(function (d) { return y(d.y); });

var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "yAxis")
  .call(yAxis);

/*
 * Here is where the points are plotted.
 * We pass the function two sets of coordinates
 * at a time.
 *
 * This loop will run three times (once for each line)
 */
for (var i=0; i < lines.length; i++) {
    svg.append("path")
      .attr("class", "plot")
      .datum(lines[i])
      .attr("d", line);
}
