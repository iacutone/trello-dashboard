var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
  .attr("x", (width / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Cards Completed");

d3.csv("data1.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.time; }));
  y.domain([0, d3.max(data, function(d) { return d.number; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("number");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.time); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.number); })
      .attr("height", function(d) { return height - y(d.number); });
});

function type(d) {
  d.number = +d.number;
  return d;
}
