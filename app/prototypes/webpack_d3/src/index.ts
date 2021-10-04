import * as d3 from "d3";
import rawData from "../data/data.json";

interface Node {
  name: string;
  value?: number;
}

interface leafNode extends Node {
  value: number;
}

interface branchNode extends Node {
  children: (leafNode | branchNode)[];
}

let data: branchNode = rawData;

let hierarchy = d3
  .hierarchy(data, (d: branchNode) => {
    return d.children;
  })
  .sum((d) => {
    return d.value;
  })
  .sort((a, b) => b.value - a.value);

let packackager = d3.pack().size([500, 500]).padding(3);

let layout = packackager(hierarchy);

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const nodeData = (d: d3.HierarchyCircularNode<unknown>) => {
  return <leafNode | branchNode>d.data;
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", 500)
  .attr("width", 500);

let bubbles = svg
  .selectAll("g")
  .data(layout.descendants())
  .enter()
  .append("g")
  .attr("a", (d, i, e) => {
    let a = nodeData(d).name;
    return a;
  })
  .attr("transform", (d, i, e) => {
    return `translate(${d.x}, ${d.y})`;
  });

bubbles
  .append("circle")
  .data(layout.descendants())
  .attr("r", (d, i, e) => {
    return d.r;
  })
  .attr("fill", randomColor)
  .style("opacity", 0.5);

bubbles
  .append("text")
  .data(layout.descendants())
  .text((d, i, e) => {
    return nodeData(d).name;
  }).attr;
