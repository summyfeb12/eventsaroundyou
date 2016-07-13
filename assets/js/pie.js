
function drawpie(data)
{
d3.select("#piecont").selectAll('*').remove();
var data = d3.nest().key(function(d)
                                      {
                                        if(d.category_id==null)
                                         return "199";
                                        else
                                        return d.category_id;
                                      })
.entries(data);


        data.forEach(function(d)
        {
            for(k=0;k<cate.length;k++)
                if(d.key==cate[k].id)
                {
                    d.key=cate[k].name;
                }
        });
var margin = {top: 20, right: 20, bottom: 10, left: 40};
var width=$('#piecont').width()- margin.left - margin.right;
var height=$('#piecont').height()- margin.top - margin.bottom;
var radius = Math.min(width, height) / 2 - 50;

var color = d3.scale.category20b();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius-40)
    .innerRadius(radius);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.values.length; });

var svg = d3.select("#piecont").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (0) +","+(-height/2.2)+")")  // centre below axis
            .text("Click on the pie to see number of events in particular category");
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.key); })
  .on("click", function(d) {
          var col=color(d.data.key);
          var cn=d.data.key;
          var cid=d.data.values[0].category_id;
          drawbarcat(col,cn,cid);
      });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d)+")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.key; });

}
