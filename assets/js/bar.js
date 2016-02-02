function drawbar(data2)
{
d3.select("#barcont").selectAll('*').remove();        
data2 = data2.sort(function (a, b) {
  if (a.start.utc > b.start.utc) {
    return 1;
  }
  if (a.start.utc < b.start.utc) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
//console.log(data2); 
var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];   
data2 = d3.nest().key(function(d){return d.month;}).sortKeys(function(a,b) { return mS.indexOf(a) - mS.indexOf(b); }).entries(data2);
//console.log(data2);    
var margin2 = {top: 40, right: 20, bottom: 60, left: 40};
var width2=$('#barcont').width()- margin2.left - margin2.right;
var height2=$('#barcont').height()- margin2.top - margin2.bottom;
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:red'>" + d.values.length + "</span><strong> Events</strong> ";
  })
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width2], .1);

var y = d3.scale.linear()
    .range([height2, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "");

var svg = d3.select("#barcont").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//data
  svg.call(tip);
  x.domain(data2.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data2, function(d) { return d.values.length; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Events");
    
   svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width2/2) +","+(-8)+")")  // centre below axis
            .text("All Categories");

  svg.selectAll(".bar")
      .data(data2)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.values.length); })
      .attr("height", function(d) { return height2 - y(d.values.length); })
      .attr("fill","steelblue")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

}

function drawbarcat(col,cn,cid)
{
d3.select("#barcont").selectAll('*').remove();    
data2=totdata;
data2=data2.filter(function(d){return d.category_id==cid});    
data2 = data2.sort(function (a, b) {
  if (a.start.utc > b.start.utc) {
    return 1;
  }
  if (a.start.utc < b.start.utc) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
//console.log(data2); 
var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];   
data2 = d3.nest().key(function(d){return d.month;}).sortKeys(function(a,b) { return mS.indexOf(a) - mS.indexOf(b); }).entries(data2);
//console.log(data2);    
var margin2 = {top: 20, right: 20, bottom: 30, left: 40};
var width2=$('#barcont').width()- margin2.left - margin2.right;
var height2=$('#barcont').height()- margin2.top - margin2.bottom;
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:red'>" + d.values.length + "</span><strong> Events</strong> ";
  })
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width2], .1);

var y = d3.scale.linear()
    .range([height2, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "");

var svg = d3.select("#barcont").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//data
svg.call(tip);
  x.domain(data2.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data2, function(d) { return d.values.length; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Events");
 svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width2/2) +","+(-8)+")")  // centre below axis
            .text(cn);

  svg.selectAll(".bar")
      .data(data2)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.values.length); })
      .attr("height", function(d) { return height2 - y(d.values.length); })
      .attr("fill",col)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

}    