import * as d3 from "d3";
import rawData from "../data/data.json";
import "./index.scss";
import { wrap } from "./svgTextWrap";
import { drawRelationLine } from "./relationLine";
import { Node, branchNode, leafNode } from "./nodeInterface";
import { colorPalette } from "./colors";

let data: branchNode = rawData;

let hierarchy = d3
  .hierarchy(data, (d: branchNode) => {
    return d.children;
  })
  .sum((d) => {
    return d.value;
  })
  .sort((a, b) => b.value - a.value);

let packackager = d3.pack().size([1000, 1000]).padding(20);

let layout = packackager(hierarchy);

let nodes = layout.descendants().map((d) => {
  return <d3.HierarchyCircularNode<leafNode | branchNode>>d;
});

const randomColor = () => {
  return `hsla(${Math.random() * 360}, 84%, 56%, 100%) `;
  //return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", 1000)
  .attr("width", 1000);

let bubbles = svg
  .append("g")
  .selectAll("g")
  .data(nodes)
  .enter()
  .append("g")
  .attr("id", (d, i, e) => {
    let a = d.data.name;
    return a;
  })
  .attr("transform", (d, i, e) => {
    return `translate(${d.x}, ${d.y})`;
  });

bubbles
  .append("circle")
  .data(nodes)
  .attr("r", (d, i, e) => {
    return d.r;
  })
  .attr("fill", (d, i, e) => {
    return colorPalette(d.depth);
  })
  .style("opacity", "1")
  .style("opacity", 0.75);

bubbles
  .append("text")
  .data(nodes)
  .text((d, i, e) => {
    return d.data.name;
  })
  .attr("transform", (d, i, e) => {
    return `translate(0,${d.r * -0.2})`;
  })
  .attr("text-anchor", "middle")
  .style("font-size", (d, i, e) => {
    return (d.r * 0.25) / (d.data.name.length * 0.01 + 1);
  })
  .attr("fill", "white");

let relations: d3.HierarchyCircularNode<branchNode | leafNode>[][] = [];

nodes.forEach((e) => {
  if (!e.data.relations) {
    return;
  }

  e.data.relations.forEach((r) => {
    let n = nodes.find((n) => {
      return n.data.name == r;
    });

    if (n == undefined) {
      throw new Error(`DATA ERROR: Cannot find Node "${r}"`);
    }

    relations.push([e, n]);
  });
});

svg
  .append("g")
  .selectAll("path")
  .data(relations)
  .enter()
  .append("path")
  .attr("d", (d, i, e) => {
    return drawRelationLine(
      {
        x: d[0].x,
        y: d[0].y,
        r: d[0].r,
      },
      {
        x: d[1].x,
        y: d[1].y,
        r: d[1].r,
      }
    );
  })
  .attr("stroke", "white")
  .attr("fill", "transparent")
  .attr("stroke-width", 3);
