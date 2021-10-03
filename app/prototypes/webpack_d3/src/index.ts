import * as d3 from "d3";
import data from "../data/data.json";

console.log(data);

let pack = (data: any) =>
  d3.pack().size([500, 500]).padding(3)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );

let root = pack(data);

const svg = d3.select("svg").attr("height", 1000).attr("width", 1000);

svg
  .selectAll()
  .data(root)
  .enter()
  .append("circle")
  .attr("r", function (d, i, e) {
    console.log(d);
    return d.r * 1;
  })
  .attr("transform", (d, i, e) => {
    return `translate(${d.x}, ${d.y})`;
  })
  .attr("fill", (d, i, e) => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  })
  .style("opacity", "0.5");
